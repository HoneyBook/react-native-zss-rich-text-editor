import { Platform } from 'react-native';
import {actions, messages} from './const';

export const InjectedMessageHandler = `
    const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    const hbAtob = function(input){
        let i = 0;
        let bc = 0;
        let bs = 0;
        let buffer;
        let output = '';

        const str = input.replace(/=+$/, '');

        if (str.length % 4 === 1) {
          throw new Error(
            "'RNFirebase.utils.atob' failed: The string to be decoded is not correctly encoded."
          );
        }

        for (
          bc = 0, bs = 0, i = 0;
          (buffer = str.charAt(i++));
          ~buffer && ((bs = bc % 4 ? bs * 64 + buffer : buffer), bc++ % 4)
            ? (output += String.fromCharCode(255 & (bs >> ((-2 * bc) & 6))))
            : 0
        ) {
          buffer = CHARS.indexOf(buffer);
        }

        return output;
      };

    const onMessage = function (messageEvent) {
      const action = JSON.parse(decodeURIComponent(escape(hbAtob(messageEvent.data))));

      switch(action.type) {
        case '${actions.enableOnChange}':
          zss_editor.enableOnChange();
          break;
        case '${actions.setTitleHtml}':
          zss_editor.setTitleHTML(action.data);
          break;
        case '${actions.toggleTitle}':
          zss_editor.toggleTitle(action.data);
          break;
        case '${actions.hideTitle}':
          zss_editor.hideTitle(action.data);
          break;
        case '${actions.showTitle}':
          zss_editor.showTitle(action.data);
          break;
        case '${actions.setContentHtml}':
          zss_editor.setContentHTML(action.data);
          break;
        case '${actions.blurTitleEditor}':
          zss_editor.blurTitleEditor();
          break;
        case '${actions.blurContentEditor}':
          zss_editor.blurContentEditor();
          break;
        case '${actions.setBold}':
          zss_editor.setBold();
          break;
        case '${actions.setItalic}':
          zss_editor.setItalic();
          break;
        case '${actions.setUnderline}':
          zss_editor.setUnderline();
          break;
        case '${actions.heading1}':
          zss_editor.setHeading('h1');
          break;
        case '${actions.heading2}':
          zss_editor.setHeading('h2');
          break;
        case '${actions.heading3}':
          zss_editor.setHeading('h3');
          break;
        case '${actions.heading4}':
          zss_editor.setHeading('h4');
          break;
        case '${actions.heading5}':
          zss_editor.setHeading('h5');
          break;
        case '${actions.heading6}':
          zss_editor.setHeading('h6');
          break;
        case '${actions.setParagraph}':
          zss_editor.setParagraph();
          break;
        case '${actions.removeFormat}':
          zss_editor.removeFormating();
          break;
        case '${actions.alignLeft}':
          zss_editor.setJustifyLeft();
          break;
        case '${actions.alignCenter}':
          zss_editor.setJustifyCenter();
          break;
        case '${actions.alignRight}':
          zss_editor.setJustifyRight();
          break;
        case '${actions.alignFull}':
          zss_editor.setJustifyFull();
          break;
        case '${actions.insertBulletsList}':
          zss_editor.setUnorderedList();
          break;
        case '${actions.insertOrderedList}':
          zss_editor.setOrderedList();
          break;
        case '${actions.insertLink}':
          zss_editor.insertLink(action.data.url, action.data.title);
          break;
        case '${actions.updateLink}':
          zss_editor.updateLink(action.data.url, action.data.title);
          break;
        case '${actions.insertImage}':
          zss_editor.insertImage(action.data);
          break;
        case '${actions.setSubscript}':
          zss_editor.setSubscript();
          break;
        case '${actions.setSuperscript}':
          zss_editor.setSuperscript();
          break;
        case '${actions.setStrikethrough}':
          zss_editor.setStrikeThrough();
          break;
        case '${actions.setHR}':
          zss_editor.setHorizontalRule();
          break;
        case '${actions.setIndent}':
          zss_editor.setIndent();
          break;
        case '${actions.setOutdent}':
          zss_editor.setOutdent();
          break;
        case '${actions.insertInputField}':
          zss_editor.insertInputField(action.data);
          break;
        case '${actions.setTitlePlaceholder}':
          zss_editor.setTitlePlaceholder(action.data);
          break;
        case '${actions.setContentPlaceholder}':
          zss_editor.setContentPlaceholder(action.data);
          break;
        case '${actions.addRecipient}':
          window.ReactNativeWebView.postMessage(JSON.stringify({type: '${messages.ADD_RECIPIENT}'}));
          break;
        case '${actions.getTitleHtml}':
          var html = zss_editor.getTitleHTML();
          window.ReactNativeWebView.postMessage(JSON.stringify({type: '${messages.TITLE_HTML_RESPONSE}', data: html}));
          break;
        case '${actions.getTitleText}':
          var html = zss_editor.getTitleText();
          window.ReactNativeWebView.postMessage(JSON.stringify({type: '${messages.TITLE_TEXT_RESPONSE}', data: html}));
          break;
        case '${actions.getContentHtml}':
          var html = zss_editor.getContentHTML();
          window.ReactNativeWebView.postMessage(JSON.stringify({type: '${messages.CONTENT_HTML_RESPONSE}', data: html}));
          break;
        case '${actions.getInputFieldText}':
          var text = zss_editor.getInputFieldText(action.data);
          window.ReactNativeWebView.postMessage(JSON.stringify({type: '${messages.INPUT_FIELD_TEXT_RESPONSE}', data: text, key: action.data}));
          break;
        case '${actions.setScheduleSendDate}':
          var data = zss_editor.setScheduleSendDate(action.data);
          break;
        case '${actions.setInputFieldText}':
          zss_editor.setInputFieldText(action.data);
          break;
        case '${actions.deleteScheduleSend}':
          zss_editor.deleteScheduleSend();
          break;
        case '${actions.focusInputField}':
          zss_editor.focusInputField(action.data);
          break;        
        case '${actions.blurInputField}':
          zss_editor.blurInputField(action.data);
          break;
        case '${actions.setTitleFocusHandler}':
          zss_editor.setTitleFocusHandler();
          break;
        case '${actions.setContentFocusHandler}':
          zss_editor.setContentFocusHandler();
          break; 
        case '${actions.getSelectedText}':
          var selectedText = getSelection().toString();
          window.ReactNativeWebView.postMessage(JSON.stringify({type: '${messages.SELECTED_TEXT_RESPONSE}', data: selectedText}));
          break;
        case '${actions.focusContent}':
          zss_editor.focusContent();
          break;
        case '${actions.focusTitle}':
          zss_editor.focusTitle();
          break;
        case '${actions.prepareInsert}':
          zss_editor.prepareInsert();
          break;
        case '${actions.restoreSelection}':
          zss_editor.restorerange();
          break;
        case '${actions.setCustomCSS}':
          zss_editor.setCustomCSS(action.data);
          break;
        case '${actions.setTextColor}':
          zss_editor.setTextColor(action.data);
          break;
        case '${actions.setBackgroundColor}':
          zss_editor.setBackgroundColor(action.data);
          break;
        case '${actions.init}':
          zss_editor.init();
          break;
        case '${actions.setEditorHeight}':
          zss_editor.setEditorHeight(action.data);
          break;
        case '${actions.setFooterHeight}':
          zss_editor.setFooterHeight(action.data);
          break;
        case '${actions.setPlatform}':
          zss_editor.setPlatform(action.data);
          break;
        case '${actions.disableContentEditing}':
          zss_editor.disableContentEditing();
          break;
        case '${actions.enableContentEditing}':
          zss_editor.enableContentEditing();
          break;
      }
    };

    ${Platform.OS === "ios"? 'window': 'document'}.addEventListener("message", onMessage);
`;
