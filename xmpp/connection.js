
const {client, xml} = require('@xmpp/client')


class XMPPConnection {
  constructor(username, password) {
    this.xmpp = client({
      service: 'ws://micke.telldus.com:5280/websocket',
      username,
      password,
    });

    this.setListeners();
    this.connect();
  }

  onOnline = (address) => {
  }
  onError = (error) => {
  }
  onOffline = (address) => {
  }
  onStanza = (stanza) => {
  }
  onInput = (input) => {
  }
  onOutput = (output) => {
  }
  onStatus = (status) => {
  }
  async sendMessage(message) {
    await this.xmpp.send(message);
  }

  setListeners() {
    this.xmpp.on('error', err => {
      this.onError(err);
    });

    this.xmpp.on('offline', (address) => {
      this.onOffline(address);
    });

    this.xmpp.on('online', async address => {
      await this.xmpp.send(xml('presence'))
      this.onOnline(address);
    });

    this.xmpp.on('stanza', async stanza => {
      this.onStanza(stanza);
    });

    this.xmpp.on('status', status => {
      this.onStatus(status);
    });

    this.xmpp.on('input', input => {
      this.onInput(input);
    });

    this.xmpp.on('output', output => {
      this.onOutput(output);
    });

    // this.xmpp.on('stanza', async stanza => {
    //   console.log("TEST stanza", JSON.stringify(stanza));

      // if (stanza.is('iq') && stanza.getChild('data')) {
      // //   await this.xmpp.send(xml('presence', {type: 'unavailable'}));

      //   await this.xmpp.stop()
      // }
    // })

    // this.xmpp.on('online', async address => {
    //   callback(address);
    //   console.log('online as', address.toString())

      // Makes itself available
      // await this.xmpp.send(xml('presence'))

      // Sends a chat message to itself
      // const message = xml(
      //   'iq',
      //   {type: 'set', to: address},
      //   xml('open', {'block-size': fileSize, sid: 'i781hf64', stanza: 'iq'})
      // )
      // await this.xmpp.send(message)

      // const message2 = xml(
      //     'iq',
      //     {type: 'set', to: address},
      //     xml('data', {'seq': '0', sid: 'i781hf64'}, data)
      //   )
      // console.log("TEST message2", message2);
      //   await this.xmpp.send(message2)
    // })


    // Add the other JID to contacts
    // const message = xml('iq', {
    //   id: 'one',
    //   from: address,
    //   type: 'set',
    //   }, xml('query', {
    //       xmlns: 'jabber:iq:roster',
    //   }, xml('item', { jid: "rimz@micke.telldus.com" })));

    // await this.xmpp.sendMessage(message);

    // const message2 = xml('iq', {// Get roaster
    //   id: 'two',
    //   type: 'get',
    //   }, xml('query', {
    //       xmlns: 'jabber:iq:roster',
    //   }));
    // await this.xmpp.sendMessage(message2);
  }

  connect() {
    this.xmpp.start().catch(err => {
      console.log("TEST err start", err);
    });
  }
}

export default XMPPConnection;