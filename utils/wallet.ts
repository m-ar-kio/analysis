import { toaster } from 'baseui/toast'
import { MARK_OWNER, TOAST_DURATION } from './constants'

export const loadKeyfile = (files) => {
  if (files[0].name.split('.').pop().toLowerCase() === 'json') {
    const upload = files[0]
    const reader = new FileReader()
    reader.readAsText(upload)
    reader.onload = () => {
      const keyfile = JSON.parse(reader.result as string)

      sessionStorage.setItem('keyfile', reader.result as string)

      if (keyfile.kty === 'RSA') {
        import('arweave/web').then((Arweave: any) => {
          const arweave = Arweave.default.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https',
          })
          arweave.wallets
            .jwkToAddress(JSON.parse(reader.result as string))
            .then((address) => {
              sessionStorage.setItem('address', address)
              window.location.reload()
            })
            .catch(console.log)
        })
      } else {
        toaster.negative('Error: Not a keyfile', {
          autoHideDuration: TOAST_DURATION,
        })
      }
    }
  } else {
    toaster.negative('Error: Not a keyfile', {
      autoHideDuration: TOAST_DURATION,
    })
  }
}

export const connectAR = () => {
  window.arweaveWallet
    .connect(['ACCESS_ADDRESS', 'ACCESS_ALL_ADDRESSES', 'SIGN_TRANSACTION'])
    .then((value) => {
      window.arweaveWallet
        .getActiveAddress()
        .then((address) => {
          if (address) {
            sessionStorage.setItem('address', address)
            window.location.reload()
          }
        })
        .catch((error) => {
          toaster.negative(error.message, {
            autoHideDuration: TOAST_DURATION,
          })
        })
    })
    .catch((error) => {
      toaster.negative(error.message, {
        autoHideDuration: TOAST_DURATION,
      })
    })
}

export const likeMark = async (hash) => {
  const address = sessionStorage.getItem('address')
  if (!address) {
    return toaster.negative('Please login first', {
      autoHideDuration: TOAST_DURATION,
    })
  }
  import('arweave/web').then(async (Arweave) => {
    const arweave = Arweave.default.init({
      host: 'arweave.net',
      port: 443,
      protocol: 'https',
    })

    const keyfile = sessionStorage.getItem('keyfile')

    if (keyfile) {
      const wallet = JSON.parse(keyfile)
      const tx = await arweave.createTransaction(
        {
          target: MARK_OWNER,
          data: 'I like this mark',
        },
        wallet
      )
      tx.addTag('App-Name', 'permamark.vote')
      tx.addTag('App-Version', '0.0.1')
      tx.addTag('Unix-Time', String(Math.round(new Date().getTime() / 1000)))
      tx.addTag('markHash', hash)
      await arweave.transactions.sign(tx, wallet)
      const isValid = await arweave.transactions.verify(tx)
      console.log('###isValid', isValid)
      await arweave.transactions.post(tx)
      arweave.transactions.getStatus(tx.last_tx).then((res) => {
        if (res.status === 200) {
          toaster.positive('Mark liked', {
            autoHideDuration: TOAST_DURATION,
          })
        } else {
          toaster.negative('Error: transaction not sent', {
            autoHideDuration: TOAST_DURATION,
          })
        }
        console.log(tx, res)
      })
      // } else if (window.arweaveWallet) {
      //   const tx = await arweave.createTransaction({
      //     target: MARK_OWNER,
      //     data: '',
      //     quantity: arweave.ar.arToWinston('0'),
      //   })
      //   tx.addTag('App-Name', 'permamark/vote')
      //   tx.addTag('liker', address)
      //   tx.addTag('mark', hash)
      //   const signedTx = await window.arweaveWallet.sign(tx)
      //   await arweave.transactions.post(signedTx)
      //   toaster.positive('Liked, thank you', {
      //     autoHideDuration: TOAST_DURATION,
      //   })
    }
  })
}
