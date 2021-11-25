import { toaster } from 'baseui/toast'
import { EXTENSION_ID, MARK_OWNER, TOAST_DURATION } from './constants'

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
  if (!window.arweaveWallet) {
    return toaster.negative('Error: Not connected to Arweave', {
      autoHideDuration: TOAST_DURATION,
    })
  }
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
  chrome.runtime.sendMessage(
    EXTENSION_ID,
    { method: 'get-keyfile' },
    async (response) => {
      if (response.keyfile) {
        import('arweave/web').then(async (Arweave) => {
          const arweave = Arweave.default.init({
            host: 'arweave.net',
            port: 443,
            protocol: 'https',
          })

          const keyfile = response.keyfile

          const tx = await arweave.createTransaction({
            target: MARK_OWNER,
            data: 'I like this mark',
            quantity: arweave.ar.arToWinston('0'),
          })
          tx.addTag('App-Name', 'permamark.vote')
          tx.addTag('App-Version', '0.0.1')
          tx.addTag(
            'Unix-Time',
            String(Math.round(new Date().getTime() / 1000))
          )
          tx.addTag('markHash', hash)

          const wallet = JSON.parse(keyfile)
          await arweave.transactions.sign(tx, wallet)
          await arweave.transactions.post(tx)
          toaster.positive('Mark liked', {
            autoHideDuration: TOAST_DURATION,
          })
        })
      } else {
        toaster.negative('Please download extension first', {
          autoHideDuration: TOAST_DURATION,
        })
      }
    }
  )
}
