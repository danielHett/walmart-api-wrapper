const { generateHeaders } = require('../src/wrapper');

let sinon = require('sinon');
let { expect } = require('chai');

// TODO: Add tests. 
/**
describe('generateHeaders', () => {
    afterEach(() => {
        sinon.restore()
    })
    
    it('returns all results when numProducts is null', () => {

    })
});
*/

describe('generateHeaders', () => {
    it('returns the correct headers', () => {
        sinon.useFakeTimers({ now: 1702787561986, shouldAdvanceTime: false });

        let headerData = {
            consumerId: "11111111-1111-1111-1111-111111111111",
            privateKey: `-----BEGIN PRIVATE KEY-----
                        MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDQfqxwgn1Fg9ow
                        xbSbvnT+jnyfRbm/9sx3mUYPDPDwEsgUxIDxZql8cs4ypGZZKl89OIYN/4Ems8tC
                        Z/+z6JCUAHvtGkts3MgPOuWDWuxJq9EFvOkBtJal9+EDgvL2HdAToHxW/jbNHHZ9
                        gXVdzCCfN6G9Wzl3jMyznlx3yg5u0fvYDYRWORLZBU2veA7Zuk0OJbcvmwe0we3Z
                        JYqCGFxC7CvnLxvzCdd/swzj6pNXNPjW+uyTYSv3GyC7WyW3nS15QrLOWAdjIjQ7
                        cutOOI6EP+hejEmmu8ygC55IjdG+iCNGHmIYm/XFVhExGHtytG8yt7WOfdeavABf
                        oJPHG3fVAgMBAAECggEAKDlUI+Ws7PEl8nRmJoj9UdIkDWdakYQ4CNfnigZNYofB
                        Fa6ekNQlXTbZ/K+2djvkQW+q/z7cyB52V7KwRKGY6RDZ19HTnOZQa43Jk0jCnuj4
                        y9JZIsTYLp9uyCpmnOB+ERdMfc0QPgygeJC2F7lGzujg+aMEqIGfyYSDIvI2zB66
                        I28YVCovryAboPMa7UeElzuyLrOE07YFoniOZYjuOpKxpo8ohYIbKA6Y6sy12ODy
                        CLlNVWavTPhqr6L+gkGGqVuEK2Awj1vzQPyjzJM2VhZpa5420j4yc1n4QFiALC0K
                        2LHzym5WEex0weou8r0Tc7m59Bjez/8dYrMl3XWrKQKBgQDzaqHJNCt3cZyi8A7M
                        WbG8ZDPEDUHz4e96shFfVJx4VSWS1te9VBqNupErKRoB/92c7j1WCwJKuaoubrnK
                        21iTu4q3KK6IgpdSmwwSXpTs1q+VTASfUQrbD2oQT8HgDgLU3z2rECmUetabL5z2
                        nNzeRqxjP2JwWqAA+PUR/4zQ7QKBgQDbReN6PFGHeXQKbfZVlylxrPDiJ2kl5kry
                        5vjwXOa2zYnu0hM0t0oafAzXJcsFqMeOK1Y4VXBDVEu77fifTlHLEhHepS8fgxOM
                        IRCArzuVTQfJolKRhIR2NUruGqJ6QMcCASj/Y3m27Rjj56iPvCSSgqoOPJBwVDN6
                        BDuPIV4tiQKBgACsGbhJiZkx2iHlEdVkpgYELNRsyPLYe+XV2hBuVmRKr+jg6QWf
                        1tbvXflFisnYoA8P5WF4dFAqhRrNuXui8XKvAOoSlbDQ04Qp43WlhznEOgXqiNS7
                        z5DdUQisf7eTslROLYhsagD7+d3B2ugfdMi0X0OC6E2xImH+Tgb3srbdAoGAa0hh
                        iQ/0D+Wjmeq9SJlCBMVJwkzoDEwFxZyulePOWghsgTW1gehf0F97ZNSv5Z/zqyKW
                        988Ns1OODm/bYg5OxJ2dsqJ9UNyv9rLCwUN7Uowy0DukTGBa8v8WHzNW5ZvGArwQ
                        lAvWpGKS+AcDGPhDqI9XpsmJHfyEhyGFBn2b94kCgYBUDsYFLyhzDBNuyAdzkkZz
                        uaLthhCus5YgHeyhA6CUgeur/FwxnQGKzBnj337mUsJdqZRIfpSIopDW0omhUGgU
                        H5I1fuQ7r8nZY7Iuw0hJlxPnA/64SMuY61OWSybLF6N0S1kHTE55l9RKO8PkQ2a3
                        Ci8EnotD0P7qexYdBAzOzg==
                        -----END PRIVATE KEY-----`,
            keyVer:'1',            
        };

        let expected = {
            "WM_SEC.AUTH_SIGNATURE": 'HoMiY3qiaXiIHJmjcXvLVbvQBjK0iAhAs4DCKbvuqrFlIo49yZM7PRFDkuUNVjiJqoqtt9NhGDAg9c1xe1Fzuv0R2zdcC0SPbzTSVY9grj/sBb1SjK5byaJyxoVr3zjWAF8c/TD8tzZ7TiLlA0XHFmQrAMyIlfWLdZsu9LBRd+p5LH4lvzjfv8ihbu2rx/TlmPP9czmURG8vlw2LoM+bCrKJiOGwecBgy7hBARnaPp5tK0y6dfvEnBCGDRW3wpZO6CVqI5W99jnmt177mgFwLNYDy4wpXM+HipiFO+OxqKIFyN2Vi8OMeVPPkq926jsGQbppPwhwSMCD1scvVkX4wA==',
            "WM_CONSUMER.INTIMESTAMP": '1702787561986',
            "WM_CONSUMER.ID": '11111111-1111-1111-1111-111111111111',
            "WM_SEC.KEY_VERSION": '1',
        }

        let actual = generateHeaders(headerData)
        expect(actual).to.deep.equal(expected);
        
        sinon.restore();
    })
});