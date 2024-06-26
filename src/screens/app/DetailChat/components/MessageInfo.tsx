import React, {useCallback, useMemo} from 'react';
import {Linking, useWindowDimensions} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import RenderHtml, {
  HTMLContentModel,
  HTMLElementModel,
} from 'react-native-render-html';

import {NavigationUtils} from '@navigation';
import {resetDataChat, saveIdMessageSearch, saveIdRoomChat} from '@redux';
import {ROUTE_NAME} from '@routeName';
import {GlobalService} from '@services';
import {API_DOMAIN} from '@util';

import {store} from '../../../../redux/store';
import {styles} from './stylesItem';

const PROTOCOL_REGEX = '((h?)(ttps?:\\/\\/)|(chrome?:\\/\\/))';

const USER_INFO_REGEX =
  "((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!$&'()*+,;=]|:)*@)?";

const IP4_REGEX =
  '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}';

const IP6_REGEX =
  '\\[?(?:(?:[a-fA-F\\d]{1,4}:){7}(?:[a-fA-F\\d]{1,4}|:)|(?:[a-fA-F\\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|:[a-fA-F\\d]{1,4}|:)|(?:[a-fA-F\\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,2}|:)|(?:[a-fA-F\\d]{1,4}:){4}(?:(?::[a-fA-F\\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,3}|:)|(?:[a-fA-F\\d]{1,4}:){3}(?:(?::[a-fA-F\\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,4}|:)|(?:[a-fA-F\\d]{1,4}:){2}(?:(?::[a-fA-F\\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,5}|:)|(?:[a-fA-F\\d]{1,4}:){1}(?:(?::[a-fA-F\\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}|(?::[a-fA-F\\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?\\]?';

const DOMAIN_REGEX =
  '(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';

const PORT_REGEX = '(:\\d*)?)';

const PATH_REGEX =
  "(/((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!$&'()*+,;=]|:|@)+(\\/(([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!$&'()*+,;=]|:|@)*)*)?)?";

const QUERY_REGEX =
  "(\\?((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!$&'()*+,;=]|:|@)|[\\uE000-\\uF8FF]|\\/|\\?)*)?";

const FRAGMENT_REGEX =
  "(#((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!$&'()*+,;=]|:|@)|\\/|\\?)*)?";

const completeRegexString = `((${PROTOCOL_REGEX}(${USER_INFO_REGEX}(${IP4_REGEX}|${IP6_REGEX}|localhost|${DOMAIN_REGEX})${PORT_REGEX}${PATH_REGEX}${QUERY_REGEX}${FRAGMENT_REGEX}))`;

const REGEXP_URL = new RegExp(completeRegexString, 'gi');

const REGEXP_EMAIL =
  /(\/|:)?(?=[A-Za-z0-9-_])([A-Z0-9_'+\-.]{1,63}[A-Z0-9_+-])@([A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Z]{2,63}/gi;

const regexpMakeMailLink = (mail: string, p1: string) =>
  p1 ? mail : `<a href="mailto:${mail}" target="_blank">${mail}</a>`;

const customAnchorify = (str: string) =>
  str
    .replace(REGEXP_URL, '<a href="$1">$1</a>')
    .replace(REGEXP_EMAIL, regexpMakeMailLink);

const customHTMLElementModels = {
  'deco-info': HTMLElementModel.fromCustomModel({
    tagName: 'deco-info',
    mixedUAStyles: {
      borderColor: '#8D8D8D',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 3,
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    contentModel: HTMLContentModel.block,
  }),
  'deco-title': HTMLElementModel.fromCustomModel({
    tagName: 'deco-title',
    mixedUAStyles: {
      fontWeight: 'bold',
      borderStyle: 'solid',
      borderLeftWidth: 4,
      borderLeftColor: '#19A2AA',
      marginBottom: 5,
      paddingLeft: 10,
    },
    contentModel: HTMLContentModel.block,
  }),
  'deco-hr': HTMLElementModel.fromCustomModel({
    tagName: 'deco-hr',
    mixedUAStyles: {
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: '#707070',
      marginTop: 10,
      marginBottom: 10,
    },
    contentModel: HTMLContentModel.block,
  }),
  'deco-bold': HTMLElementModel.fromCustomModel({
    tagName: 'deco-bold',
    mixedUAStyles: {
      fontWeight: 'bold',
    },
    contentModel: HTMLContentModel.textual,
  }),
  'deco-red': HTMLElementModel.fromCustomModel({
    tagName: 'deco-red',
    mixedUAStyles: {
      color: '#E44122',
    },
    contentModel: HTMLContentModel.textual,
  }),
};

const tagsStyles = {
  body: styles.txtMessage,
  a: {
    textDecorationLine: 'none',
  },
};

export type MessageInfoProps = {
  text: string;
  joinedUsers?: any;
  textSetting?: any;
  setPageLoading?: (value: React.SetStateAction<boolean>) => void;
};

export default function MessageInfo({
  text,
  joinedUsers = [],
  textSetting = {},
  setPageLoading,
}: MessageInfoProps) {
  const {width} = useWindowDimensions();

  const renderersProps = useMemo(
    () => ({
      a: {
        onPress: async (event: any, href: string) => {
          const parseUrl = String(href).split('/');
          if (
            (parseUrl[0] === 'https:' || parseUrl[0] === 'http:') &&
            parseUrl[2] === API_DOMAIN &&
            parseUrl[3] === 'chat'
          ) {
            const parseParams = String(parseUrl[4]).split('?messId=');
            const roomId = Number(parseParams[0]);
            const messageId = parseParams[1];
            if (roomId > 0) {
              const state = store.getState();
              if (roomId === state?.chat?.id_roomChat) {
                GlobalService.showLoading();
                await store.dispatch(saveIdMessageSearch(messageId));
                setPageLoading && setPageLoading(true);
              } else {
                const subjectRoom = state?.chat?.roomList.filter(
                  el => el.id === roomId,
                );
                if (subjectRoom.length === 0) {
                  showMessage({
                    message: 'チャットルームが見つかりません。',
                    type: 'danger',
                  });
                  NavigationUtils.pop(1);
                  return;
                }
                GlobalService.showLoading();
                await store.dispatch(resetDataChat());
                await store.dispatch(saveIdRoomChat(roomId));
                NavigationUtils.navigate(ROUTE_NAME.DETAIL_CHAT, {
                  idRoomChat: roomId,
                  idMessageSearchListChat: messageId,
                });
              }
              return;
            }
          }
          GlobalService.showLoading();
          Linking.openURL(href);
          setTimeout(() => {
            GlobalService.hideLoading();
          }, 1000);
        },
      },
    }),
    [setPageLoading],
  );
  /**
   * "@xxxxxx"の文字列で実在するユーザーをリンク文字に置き換え
   * @param {string} text テキスト
   * @param {any} joinedUsers  参加ユーザー情報
   */
  const convertMentionToLink = useCallback((input: string, users: any) => {
    let replaceText = input;
    // メンションメンバー情報とメッセージを比較し、本当にメッセージにメンション内容が入っているかを確認
    users.forEach((joinedUser: any) => {
      let mentionText = `@${joinedUser?.last_name.replace(
        ' ',
        '',
      )}${joinedUser?.first_name?.replace(' ', '')}`;
      if (replaceText.includes(mentionText)) {
        const escapedText = mentionText.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&');
        replaceText = replaceText.replace(
          new RegExp(escapedText, 'g'),
          '<b>$&</b>',
        );
      }
    });

    // @all/@AIを太字にする
    // RNのバージョンが0.68以下、Hermes無効だと使用できない正規表現
    // https://github.com/facebook/react-native/issues/29271
    // replaceText = replaceText.replace(/(?<=( |　|<br>|;">))@all/g, '<b>$&</b>');
    // replaceText = replaceText.replace(/@all(?=( |　|<br>|<\/p>))/g, '<b>$&</b>');
    // replaceText = replaceText.replace(/(?<=( |　|<br>|;">))@AI/g, '<b>$&</b>');
    // replaceText = replaceText.replace(/@AI(?=( |　|<br>|<\/p>))/g, '<b>$&</b>');

    replaceText = replaceText.replace(/ @all/g, ' <b>@all</b>');
    replaceText = replaceText.replace(/　@all/g, '　<b>@all</b>');
    replaceText = replaceText.replace(/<br>@all/g, '<br><b>@all</b>');
    replaceText = replaceText.replace(/;">@all/g, ';"><b>@all</b>');
    replaceText = replaceText.replace(/@all /g, '<b>@all</b> ');
    replaceText = replaceText.replace(/@all　/g, '<b>@all</b>　');
    replaceText = replaceText.replace(/@all<br>/g, '<b>@all</b><br>');
    replaceText = replaceText.replace(/@all<\/p>/g, '<b>@all</b></p>');

    replaceText = replaceText.replace(/ @AI/g, ' <b>@AI</b>');
    replaceText = replaceText.replace(/　@AI/g, '　<b>@AI</b>');
    replaceText = replaceText.replace(/<br>@AI/g, '<br><b>@AI</b>');
    replaceText = replaceText.replace(/;">@AI/g, ';"><b>@AI</b>');
    replaceText = replaceText.replace(/@AI /g, '<b>@AI</b> ');
    replaceText = replaceText.replace(/@AI　/g, '<b>@AI</b>　');
    replaceText = replaceText.replace(/@AI<br>/g, '<b>@AI</b><br>');
    replaceText = replaceText.replace(/@AI<\/p>/g, '<b>@AI</b></p>');

    return replaceText;
  }, []);

  const convertMessageNotation = useCallback((input: string) => {
    let replaceText = input;
    replaceText = replaceText.replace(
      new RegExp('\\[title\\]((.?s?)*?)\\[/title\\]', 'gi'),
      '<deco-title>$1</deco-title>',
    );
    replaceText = replaceText.replace(
      new RegExp('\\[info\\]((.?s?)*?)\\[/info\\]', 'gi'),
      '<deco-info>$1</deco-info>',
    );
    replaceText = replaceText.replace(
      new RegExp('\\[hr\\]((.?s?)*?)', 'gi'),
      '<deco-hr></deco-hr>$1',
    );
    replaceText = replaceText.replace(
      new RegExp('\\[bold\\]((.?s?)*?)\\[/bold\\]', 'gi'),
      '<deco-bold>$1</deco-bold>',
    );
    replaceText = replaceText.replace(
      new RegExp('\\[red\\]((.?s?)*?)\\[/red\\]', 'gi'),
      '<deco-red>$1</deco-red>',
    );
    replaceText =
      '<p style="font-size:16px;margin: 0px;">' + replaceText + '</p>';

    return replaceText;
  }, []);

  return (
    <>
      <RenderHtml
        defaultTextProps={textSetting}
        renderersProps={renderersProps}
        contentWidth={width}
        source={{
          html: text
            ? convertMentionToLink(
                customAnchorify(
                  convertMessageNotation(text.replace(/\n/g, '<br>')),
                ),
                joinedUsers,
              )
            : '',
        }}
        customHTMLElementModels={customHTMLElementModels}
        // @ts-ignore
        tagsStyles={tagsStyles}
      />
    </>
  );
}
