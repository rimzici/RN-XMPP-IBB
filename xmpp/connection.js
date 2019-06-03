
const {client, xml} = require('@xmpp/client')

let xmpp = client({
    service: 'ws://micke.telldus.com:5280/websocket',
    username: 'rimz@micke.telldus.com',
    password: 'password',
});

const XMPPConnection = (callback) => {
return {
   initiate: ({data, fileSize}) => {
    xmpp.on('error', err => {
        console.log("TEST err", err.toString())
      })
      
      xmpp.on('offline', () => {
        // console.log('offline')
      })
      
      xmpp.on('stanza', async stanza => {
          console.log("TEST stanza", JSON.stringify(stanza));
          
        if (stanza.is('iq') && stanza.getChild('data')) {
        //   await xmpp.send(xml('presence', {type: 'unavailable'}));
          callback(stanza.getChild('data').text());
          await xmpp.stop()
        }
      })
      
      xmpp.on('online', async address => {
        // console.log('online as', address.toString())
      
        // Makes itself available
        // await xmpp.send(xml('presence'))
      
        // Sends a chat message to itself
        const message = xml(
          'iq',
          {type: 'set', to: address},
          xml('open', {'block-size': fileSize, sid: 'i781hf64', stanza: 'iq'})
        )
        await xmpp.send(message)

        const message2 = xml(
            'iq',
            {type: 'set', to: address},
            xml('data', {'seq': '0', sid: 'i781hf64'}, data)
          )
        console.log("TEST message2", message2);
          await xmpp.send(message2)
      })
      
      // Debug
      xmpp.on('status', status => {
        // console.debug('status', status)
      })
      xmpp.on('input', input => {
        // console.debug(input)
      })
      xmpp.on('output', output => {
        // console.debug(output)
      })
    xmpp.start().catch(err => {
        // console.log("TEST err start", err);
    });
    },
};
}

export default XMPPConnection;