/*
 * (c) Copyright Ascensio System SIA 2010-2024
 *
 * This program is a free software product. You can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License (AGPL)
 * version 3 as published by the Free Software Foundation. In accordance with
 * Section 7(a) of the GNU AGPL its Section 15 shall be amended to the effect
 * that Ascensio System SIA expressly excludes the warranty of non-infringement
 * of any third-party rights.
 *
 * This program is distributed WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For
 * details, see the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
 *
 * You can contact Ascensio System SIA at 20A-6 Ernesta Birznieka-Upish
 * street, Riga, Latvia, EU, LV-1050.
 *
 * The  interactive user interfaces in modified source and object code versions
 * of the Program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU AGPL version 3.
 *
 * Pursuant to Section 7(b) of the License you must retain the original Product
 * logo when distributing the program. Pursuant to Section 7(e) we decline to
 * grant you any rights under trademark law for use of our trademarks.
 *
 * All the Product's GUI elements, including illustrations and icon sets, as
 * well as technical writing content are licensed under the terms of the
 * Creative Commons Attribution-ShareAlike 4.0 International. See the License
 * terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode
 *
 */

+function () {
    !window.common && (window.common = {});
    !common.utils && (common.utils = {});

    common.utils = new(function(){
        var userAgent = navigator.userAgent.toLowerCase(),
            check = function(regex){
                return regex.test(userAgent);
            },
            isMac = check(/macintosh|mac os x/);
        return {
            openLink: function(url) {
                if (url) {
                    window.parent.APP.openURL(url);
                    return;
                    var newDocumentPage = window.open(url, '_blank');
                    if (newDocumentPage)
                        newDocumentPage.focus();
                }
            }
            , dialogPrint: function(url, api) {
                $('#id-print-frame').remove();

                if ( !!url ) {
                    var iframePrint = document.createElement("iframe");

                    iframePrint.id = "id-print-frame";
                    iframePrint.style.display = 'none';
                    iframePrint.style.visibility = "hidden";
                    iframePrint.style.position = "fixed";
                    iframePrint.style.right = "0";
                    iframePrint.style.bottom = "0";
                    document.body.appendChild(iframePrint);

                    iframePrint.onload = function () {
                        try {
                            iframePrint.contentWindow.focus();
                            iframePrint.contentWindow.print();
                            iframePrint.contentWindow.blur();
                            window.focus();
                        } catch (e) {
                            api.asc_DownloadAs(new Asc.asc_CDownloadOptions(Asc.c_oAscFileType.PDF));
                        }
                    };

                    iframePrint.src = url;
                }
            },
            htmlEncode: function(value) {
                return $('<div/>').text(value).html();
            },

            fillUserInfo: function(info, lang, defname, defid) {
                var _user = info || {};
                _user.anonymous = !_user.id;
                !_user.id && (_user.id = defid);
                _user.fullname = !_user.name ? defname : _user.name;
                _user.group && (_user.fullname = (_user.group).toString() + AscCommon.UserInfoParser.getSeparator() + _user.fullname);
                _user.guest = !_user.name;
                return _user;
            },

            fixedDigits: function(num, digits, fill) {
                (fill===undefined) && (fill = '0');
                var strfill = "",
                    str = num.toString();
                for (var i=str.length; i<digits; i++) strfill += fill;
                return strfill + str;
            },
            getKeyByValue: function(obj, value) {
                for(var prop in obj) {
                    if(obj.hasOwnProperty(prop)) {
                        if(obj[prop] === value)
                            return prop;
                    }
                }
            },

            isMac : isMac
        };
    })();
}();
