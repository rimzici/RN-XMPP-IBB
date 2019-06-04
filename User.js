import React from 'react'
import { View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
const uuidv4 = require('uuid/v4');

const {xml} = require('@xmpp/client')
import XMPPConnection from "./xmpp/connection";

class User extends React.Component {
  state = {
    messages: [],
    isLogging: true,
  }
  constructor(props) {
      super(props);
      this.xmpp = new XMPPConnection(props.uname, props.pass);
      this.setListener();
  }

  componentWillMount() {
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
    const { text, user = {}, _id } = messages[0];
    const message = xml(
        'message',
        {type: 'chat', to: this.props.uname === "rimz@micke.telldus.com" ? "micke.prag@micke.telldus.com" : "rimz@micke.telldus.com"},
        xml('body', null, text)
      )
    this.xmpp.sendMessage(message);
  }

  setListener = () => {
    this.xmpp.onStanza = (stanza) => {
        if (stanza.is('message') && stanza.getChild('body')) {
            const message = stanza.getChild('body').text();
            const messages = [
                {
                    _id: uuidv4(),
                    text: message,
                    createdAt: new Date(),
                    user: {
                        _id: this.props.uname === "rimz@micke.telldus.com" ? "micke.prag@micke.telldus.com" : "rimz@micke.telldus.com",
                        name: this.props.uname === "rimz@micke.telldus.com" ? "M P" : "R F",
                    },
                }
            ];
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, messages),
              }));
        }
    }

    this.xmpp.onOnline = (address) => {
        this.setState({
            isLogging: false,
        });
    }
  }

  render() {
    return (
    <View style={{flex: 1, alignItems: 'stretch'}}>
      {this.state.isLogging ?
        <Text>
        Logging In...
        </Text>
        :
        <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.props.uname,
        }}
      />
    }
      </View>
    )
  }
}

export default User;