import { Font } from '@react-pdf/renderer';
import { EResumeFonts } from '@/types/Resume';

export class PDFFonts {
  load = (font: EResumeFonts) => {
    const loadedFonts = Font.getRegisteredFonts();

    for (const key in loadedFonts) {
      if (key === font) {
        console.log('already loaded', font);
        return;
      }
    }

    console.log('loading', font);

    switch (font) {
      case EResumeFonts.Roboto:
        Font.register({
          family: EResumeFonts.Roboto,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/roboto/v15/W5F8_SL0XFawnjxHGsZjJA.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/roboto/v15/hcKoSgxdnKlbH5dlTwKbow.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/roboto/v15/bdHGHleUa-ndQCOrdpfxfw.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/roboto/v15/owYYXKukxFDFjr0ZO8NXh6CWcynf_cDxXwCLxiixG1c.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.OpenSans:
        Font.register({
          family: EResumeFonts.OpenSans,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/opensans/v13/IgZJs4-7SA1XX_edsoXWog.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/opensans/v13/O4NhV7_qs9r9seTo7fnsVKCWcynf_cDxXwCLxiixG1c.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/opensans/v13/k3k702ZOKiLJc3WVjuplzC3USBnSvpkopQaUR-2r7iU.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/opensans/v13/PRmiXeptR36kaC0GEAetxne1Pd76Vl7zRpE7NLJQ7XU.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.Lato:
        Font.register({
          family: EResumeFonts.Lato,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/lato/v11/h7rISIcQapZBpei-sXwIwg.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/lato/v11/P_dJOFJylV3A870UIOtr0w.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/lato/v11/iX_QxBBZLhNj5JHlTzHQzg.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/lato/v11/WFcZakHrrCKeUJxHA4T_gw.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.Montserrat:
        Font.register({
          family: EResumeFonts.Montserrat,
          fonts: [
            {
              src: 'https://assets.hobort.com/fonts/montserrat/Montserrat-Regular.woff',
              fontWeight: 400,
            },
            {
              src: 'https://assets.hobort.com/fonts/montserrat/Montserrat-Italic.woff',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://assets.hobort.com/fonts/montserrat/Montserrat-Bold.woff',
              fontWeight: 700,
            },
            {
              src: 'https://assets.hobort.com/fonts/montserrat/Montserrat-BoldItalic.woff',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.RobotoCondensed:
        Font.register({
          family: EResumeFonts.RobotoCondensed,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/robotocondensed/v13/Zd2E9abXLFGSr9G3YK2MsKDbm6fPDOZJsR8PmdG62gY.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/robotocondensed/v13/BP5K8ZAJv9qEbmuFp8RpJY_eiqgTfYGaH0bJiUDZ5GA.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/robotocondensed/v13/b9QBgL0iMZfDSpmcXcE8nPOYkGiSOYDq_T7HbIOV1hA.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/robotocondensed/v13/mg0cGfGRUERshzBlvqxeAE2zk2RGRC3SlyyLLQfjS_8.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.Nunito:
        Font.register({
          family: EResumeFonts.Nunito,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/nunito/v8/ySZTeT3IuzJj0GK6uGpbBg.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/nunito/v8/NZNWFpgsC6hUUE2c03CLoQ.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/nunito/v8/aEdlqgMuYbpe4U3TnqOQMA.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/nunito/v8/4cHctiCFYmTpv-a6b6vYsKCWcynf_cDxXwCLxiixG1c.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.NunitoSans:
        Font.register({
          family: EResumeFonts.NunitoSans,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/nunitosans/v1/qDS9UelBO44ppiSawKNcIKCWcynf_cDxXwCLxiixG1c.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/nunitosans/v1/w9sy7IRyDFLWACdltghEwUeOrDcLawS7-ssYqLr2Xp4.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/nunitosans/v1/XvilrNtBQKRMeiqSPzEFHXe1Pd76Vl7zRpE7NLJQ7XU.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/nunitosans/v1/ORCQQ32ldzJ6bFTh_zXqV8_zJjSACmk0BRPxQqhnNLU.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.Poppins:
        Font.register({
          family: EResumeFonts.Poppins,
          fonts: [
            {
              src: 'https://assets.hobort.com/fonts/poppins/Poppins-Regular.woff',
              fontWeight: 400,
            },
            {
              src: 'https://assets.hobort.com/fonts/poppins/Poppins-Italic.woff',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://assets.hobort.com/fonts/poppins/Poppins-Bold.woff',
              fontWeight: 700,
            },
            {
              src: 'https://assets.hobort.com/fonts/poppins/Poppins-BoldItalic.woff',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      // case EResumeFonts.Mukta:
      //   Font.register({
      //     family: EResumeFonts.Mukta,
      //     fonts: [
      //       {
      //         src: 'https://fonts.gstatic.com/s/ekmukta/v7/aFcjXdC5jyJ1p8w54wIIrg.ttf',
      //         fontWeight: 400,
      //       },
      //       {
      //         src: 'https://fonts.gstatic.com/s/ekmukta/v7/4ugcOGR28Jn-oBIn0-qLYaCWcynf_cDxXwCLxiixG1c.ttf',
      //         fontWeight: 700,
      //       },
      //     ],
      //   });
      //   return;
      case EResumeFonts.Quicksand:
        Font.register({
          family: EResumeFonts.Quicksand,
          fonts: [
            {
              src: 'https://assets.hobort.com/fonts/quicksand/Quicksand-Regular.woff',
              fontWeight: 400,
            },
            {
              src: 'https://assets.hobort.com/fonts/quicksand/Quicksand-Italic.woff',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://assets.hobort.com/fonts/quicksand/Quicksand-Bold.woff',
              fontWeight: 700,
            },
            {
              src: 'https://assets.hobort.com/fonts/quicksand/Quicksand-BoldItalic.woff',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.FiraSans:
        Font.register({
          family: EResumeFonts.FiraSans,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/firasans/v6/nsT0isDy56OkSX99sFQbXw.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/firasans/v6/cPT_2ddmoxsUuMtQqa8zGqCWcynf_cDxXwCLxiixG1c.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/firasans/v6/DugPdSljmOTocZOR2CItOi3USBnSvpkopQaUR-2r7iU.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/firasans/v6/6s0YCA9oCTF6hM60YM-qTXe1Pd76Vl7zRpE7NLJQ7XU.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.Rubik:
        Font.register({
          family: EResumeFonts.Rubik,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/rubik/v3/4sMyW_teKWHB3K8Hm-Il6A.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/rubik/v3/elD65ddI0qvNcCh42b1Iqg.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/rubik/v3/m1GGHcpLe6Mb0_sAyjXE4g.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/rubik/v3/R4g_rs714cUXVZcdnRdHw_esZW2xOQ-xsNqO47m55DA.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.Ubuntu:
        Font.register({
          family: EResumeFonts.Ubuntu,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/ubuntu/v9/lhhB5ZCwEkBRbHMSnYuKyA.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/ubuntu/v9/b9hP8wd30SygxZjGGk4DCQ.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/ubuntu/v9/B7BtHjNYwAp3HgLNagENOQ.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/ubuntu/v9/pqisLQoeO9YTDCNnlQ9bf6CWcynf_cDxXwCLxiixG1c.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.WorkSans:
        Font.register({
          family: EResumeFonts.WorkSans,
          fonts: [
            {
              src: 'https://assets.hobort.com/fonts/worksans/WorkSans-Regular.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://assets.hobort.com/fonts/worksans/WorkSans-Italic.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://assets.hobort.com/fonts/worksans/WorkSans-Bold.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://assets.hobort.com/fonts/worksans/WorkSans-BoldItalic.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.Raleway:
        Font.register({
          family: EResumeFonts.Raleway,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/raleway/v11/_dCzxpXzIS3sL-gdJWAP8A.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/raleway/v11/utU2m1gdZSfuQpArSy5Dbw.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/raleway/v11/VGEV9-DrblisWOWLbK-1XPesZW2xOQ-xsNqO47m55DA.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/raleway/v11/lFxvRPuGFG5ktd7P0WRwKi3USBnSvpkopQaUR-2r7iU.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      ////
      case EResumeFonts.PTSerif:
        Font.register({
          family: EResumeFonts.PTSerif,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/ptserif/v8/sAo427rn3-QL9sWCbMZXhA.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/ptserif/v8/sAo427rn3-QL9sWCbMZXhA.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/ptserif/v8/kyZw18tqQ5if-_wpmxxOeKCWcynf_cDxXwCLxiixG1c.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/ptserif/v8/Foydq9xJp--nfYIx2TBz9QJKKGfqHaYFsRG-T3ceEVo.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.Bitter:
        Font.register({
          family: EResumeFonts.Bitter,
          fonts: [
            {
              src: 'https://assets.hobort.com/fonts/bitter/Bitter-Regular.woff',
              fontWeight: 400,
            },
            {
              src: 'https://assets.hobort.com/fonts/bitter/Bitter-Italic.woff',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://assets.hobort.com/fonts/bitter/Bitter-Bold.woff',
              fontWeight: 700,
            },
            {
              src: 'https://assets.hobort.com/fonts/bitter/Bitter-BoldItalic.woff',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.Merriweather:
        Font.register({
          family: EResumeFonts.Merriweather,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/merriweather/v13/RFda8w1V0eDZheqfcyQ4EC3USBnSvpkopQaUR-2r7iU.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/merriweather/v13/So5lHxHT37p2SS4-t60SlPMZXuCXbOrAvx5R0IT5Oyo.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/merriweather/v13/ZvcMqxEwPfh2qDWBPxn6nkD2ttfZwueP-QU272T9-k4.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/merriweather/v13/EYh7Vl4ywhowqULgRdYwIPAs9-1nE9qOqhChW0m4nDE.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.CrimsonText:
        Font.register({
          family: EResumeFonts.CrimsonText,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/crimsontext/v6/3IFMwfRa07i-auYR-B-zNS3USBnSvpkopQaUR-2r7iU.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/crimsontext/v6/a5QZnvmn5amyNI-t2BMkWPMZXuCXbOrAvx5R0IT5Oyo.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/crimsontext/v6/rEy5tGc5HdXy56Xvd4f3I0D2ttfZwueP-QU272T9-k4.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/crimsontext/v6/4j4TR-EfnvCt43InYpUNDPAs9-1nE9qOqhChW0m4nDE.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.PlayfairDisplay:
        Font.register({
          family: EResumeFonts.PlayfairDisplay,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/playfairdisplay/v10/2NBgzUtEeyB-Xtpr9bm1CV6uyC_qD11hrFQ6EGgTJWI.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/playfairdisplay/v10/9MkijrV-dEJ0-_NWV7E6NzMsbnvDNEBX25F5HWk9AhI.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/playfairdisplay/v10/UC3ZEjagJi85gF9qFaBgICsv6SrURqJprbhH_C1Mw8w.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/playfairdisplay/v10/n7G4PqJvFP2Kubl0VBLDECsYW3XoOVcYyYdp9NzzS9E.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.NotoSerif:
        Font.register({
          family: EResumeFonts.NotoSerif,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/notoserif/v4/zW6mc7bC1CWw8dH0yxY8JfesZW2xOQ-xsNqO47m55DA.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/notoserif/v4/HQXBIwLHsOJCNEQeX9kNzy3USBnSvpkopQaUR-2r7iU.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/notoserif/v4/lJAvZoKA5NttpPc9yc6lPQJKKGfqHaYFsRG-T3ceEVo.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/notoserif/v4/Wreg0Be4tcFGM2t6VWytvED2ttfZwueP-QU272T9-k4.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.Arvo:
        Font.register({
          family: EResumeFonts.Arvo,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/arvo/v9/vvWPwz-PlZEwjOOIKqoZzA.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/arvo/v9/id5a4BCjbenl5Gkqonw_Rw.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/arvo/v9/OB3FDST7U38u3OjPK_vvRQ.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/arvo/v9/Hvl2MuWoXLaCy2v6MD4Yvw.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.Lora:
        Font.register({
          family: EResumeFonts.Lora,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/lora/v9/aXJ7KVIGcejEy1abawZazg.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/lora/v9/AN2EZaj2tFRpyveuNn9BOg.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/lora/v9/enKND5SfzQKkggBA_VnT1A.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/lora/v9/ivs9j3kYU65pR9QD9YFdzQ.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      // case EResumeFonts.LibreBaskerville:
      //   Font.register({
      //     family: EResumeFonts.LibreBaskerville,
      //     fonts: [
      //       {
      //         src: 'https://fonts.gstatic.com/s/librebaskerville/v4/pR0sBQVcY0JZc_ciXjFsKyyZRYCSvpCzQKuMWnP5NDY.ttf',
      //         fontWeight: 400,
      //       },
      //       {
      //         src: 'https://fonts.gstatic.com/s/librebaskerville/v4/kH7K4InNTm7mmOXXjrA5v-xuswJKUVpBRfYFpz0W3Iw.ttf',
      //         fontWeight: 700,
      //       },
      //     ],
      //   });
      //   return;
      case EResumeFonts.CormorantGaramond:
        Font.register({
          family: EResumeFonts.CormorantGaramond,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/cormorantgaramond/v1/EI2hhCO6kSfLAy-Dpd8fd7_BES7rBA-D9Lo3vCx9yHc.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/cormorantgaramond/v1/eGTlzchVxDKKvK6d7drzlkVlEttMzBRhK_wsRQ4MqEE.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/cormorantgaramond/v1/iEjm9hVxcattz37Y8gZwVdNg01MkafbqNYmDx8wt95c.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/cormorantgaramond/v1/zuqx3k1yUEl3Eavo-ZPEAvEntfLz8TC-DlAIEJQEwCA.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      // case EResumeFonts.Eczar:
      //   Font.register({
      //     family: EResumeFonts.Eczar,
      //     fonts: [
      //       {
      //         src: 'https://fonts.gstatic.com/s/eczar/v4/uKZcAQ5JBBs1UbeXFRbBRg.ttf',
      //         fontWeight: 400,
      //       },
      //       {
      //         src: 'https://fonts.gstatic.com/s/eczar/v4/ELC8RVXfBMb3VuuHtMwBOA.ttf',
      //         fontWeight: 700,
      //       },
      //     ],
      //   });
      //   return;
      case EResumeFonts.Alegreya:
        Font.register({
          family: EResumeFonts.Alegreya,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/alegreya/v7/62J3atXd6bvMU4qO_ca-eA.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/alegreya/v7/cbshnQGxwmlHBjUil7DaIfesZW2xOQ-xsNqO47m55DA.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/alegreya/v7/5oZtdI5-wQwgAFrd9erCsaCWcynf_cDxXwCLxiixG1c.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/alegreya/v7/IWi8e5bpnqhMRsZKTcTUWgJKKGfqHaYFsRG-T3ceEVo.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      // case EResumeFonts.BioRhyme:
      //   Font.register({
      //     family: EResumeFonts.BioRhyme,
      //     fonts: [
      //       {
      //         src: 'https://fonts.gstatic.com/s/biorhyme/v1/n6v5UkVPy_CjbP3fvsu1CA.ttf',
      //         fontWeight: 400,
      //       },
      //       {
      //         src: 'https://fonts.gstatic.com/s/biorhyme/v1/36KN76U1iKt5TFDm2lBz0KCWcynf_cDxXwCLxiixG1c.ttf',
      //         fontWeight: 700,
      //       },
      //     ],
      //   });
      //   return;
      // case EResumeFonts.Neuton:
      //   Font.register({
      //     family: EResumeFonts.Neuton,
      //     fonts: [
      //       {
      //         src: 'https://fonts.gstatic.com/s/neuton/v9/9R-MGIOQUdjAVeB6nE6PcQ.ttf',
      //         fontWeight: 400,
      //       },
      //       {
      //         src: 'https://fonts.gstatic.com/s/neuton/v9/uVMT3JOB5BNFi3lgPp6kEg.ttf',
      //         fontWeight: 400,
      //         fontStyle: 'italic',
      //       },
      //       {
      //         src: 'https://fonts.gstatic.com/s/neuton/v9/gnWpkWY7DirkKiovncYrfg.ttf',
      //         fontWeight: 700,
      //       },
      //     ],
      //   });
      //   return;
      case EResumeFonts.Inter:
        Font.register({
          family: EResumeFonts.Inter,
          fonts: [
            {
              src: 'https://assets.hobort.com/fonts/inter/Inter-Regular.woff',
              fontWeight: 400,
            },
            {
              src: 'https://assets.hobort.com/fonts/inter/Inter-Italic.woff',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://assets.hobort.com/fonts/inter/Inter-Bold.woff',
              fontWeight: 700,
            },
            {
              src: 'https://assets.hobort.com/fonts/inter/Inter-BoldItalic.woff',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.Spectral:
        Font.register({
          family: EResumeFonts.Spectral,
          fonts: [
            {
              src: 'https://assets.hobort.com/fonts/spectral/Spectral-Medium.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://assets.hobort.com/fonts/spectral/Spectral-Italic.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://assets.hobort.com/fonts/spectral/Spectral-Bold.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://assets.hobort.com/fonts/spectral/Spectral-BoldItalic.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.LibreFranklin:
        Font.register({
          family: EResumeFonts.LibreFranklin,
          fonts: [
            {
              src: 'https://fonts.gstatic.com/s/librefranklin/v1/PFwjf3aDdAQPvNKUrT3U7_fSnedoLXQQjURyDxluu8g.ttf',
              fontWeight: 400,
            },
            {
              src: 'https://fonts.gstatic.com/s/librefranklin/v1/zrsyK9EytLQ07oRM9IZIsX5kKxjpQfTpnFf2SrDLxlg.ttf',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://fonts.gstatic.com/s/librefranklin/v1/1_DGDtljMiPWFs5rl_p0yEnStGWSv3WdwjmyyI8xc7Q.ttf',
              fontWeight: 700,
            },
            {
              src: 'https://fonts.gstatic.com/s/librefranklin/v1/7_V210XP3LBEtEwiCTqhow7kn3RFjf4gfwsdsBE-Rf4.ttf',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
        return;
      case EResumeFonts.ZillaSlab:
        Font.register({
          family: EResumeFonts.ZillaSlab,
          fonts: [
            {
              src: 'https://assets.hobort.com/fonts/zillaslab/ZillaSlab-Regular.woff',
              fontWeight: 400,
            },
            {
              src: 'https://assets.hobort.com/fonts/zillaslab/ZillaSlab-RegularItalic.woff',
              fontWeight: 400,
              fontStyle: 'italic',
            },
            {
              src: 'https://assets.hobort.com/fonts/zillaslab/ZillaSlab-Bold.woff',
              fontWeight: 700,
            },
            {
              src: 'https://assets.hobort.com/fonts/zillaslab/ZillaSlab-BoldItalic.woff',
              fontWeight: 700,
              fontStyle: 'italic',
            },
          ],
        });
    }
  };
}

const pdfFonts = new PDFFonts();

export default pdfFonts;
