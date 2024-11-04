import FormLabel from '@/components/FormLabel';
import Input from '@/components/Input';
import FormErrors from '@/components/FormErrors';
import Switch from '@/components/Switch';
import { IForm } from '@/components/ProfilesView/ProfileEditor/TextItemForm/TextItemFormController';
import { useMemo } from 'react';
import { ESocialLinkType } from '@/types/Profile';
import SocialItemFormController from '@/components/ProfilesView/ProfileEditor/SocialItemForm/SocialItemFormController';

interface IProps {
  controller: SocialItemFormController;
}

export default function SocialItemForm({ controller }: IProps) {
  controller.useController();
  const { form, state } = controller;

  const label = useMemo(() => {
    switch (form.type) {
      case ESocialLinkType.Facebook:
        return ['facebook.svg', 'Facebook'];
      case ESocialLinkType.YouTube:
        return ['youtube.svg', 'YouTube'];
      case ESocialLinkType.Instagram:
        return ['instagram.svg', 'Instagram'];
      case ESocialLinkType.WhatsApp:
        return ['whatsapp.svg', 'WhatsApp'];
      case ESocialLinkType.TikTok:
        return ['tiktok.svg', 'TikTok'];
      case ESocialLinkType.WeChat:
        return ['wechat.svg', 'WeChat'];
      case ESocialLinkType.Telegram:
        return ['telegram.svg', 'Telegram'];
      case ESocialLinkType.Snapchat:
        return ['snapchat.svg', 'Snapchat'];
      case ESocialLinkType.Douyin:
        return ['tiktok.svg', 'Douyin'];
      case ESocialLinkType.Kuaishou:
        return ['kuaishou.svg', 'Kuaishou'];
      case ESocialLinkType.X:
        return ['x.svg', 'X'];
      case ESocialLinkType.Weibo:
        return ['weibo.svg', 'Weibo'];
      case ESocialLinkType.QQ:
        return ['qq.svg', 'QQ'];
      case ESocialLinkType.Pinterest:
        return ['pinterest.svg', 'Pinterest'];
      case ESocialLinkType.LinkedIn:
        return ['linkedin.svg', 'LinkedIn'];
    }
    return ['', ''];
  }, [form.type]);

  return (
    <div className="col-span-full">
      <div className="flex justify-between">
        <FormLabel className="flex align-baseline">{label[1]}</FormLabel>
        {form.canDisable && (
          <Switch
            checked={form.enabled}
            onChange={controller.onChangeEnabled}
          />
        )}
      </div>
      <div>
        <Input<IForm>
          field="value"
          errors={state.errors}
          value={form.value}
          onChange={controller.onChangeValue}
        />
        <FormErrors<IForm>
          field="value"
          errors={state.errors}
        />
      </div>
    </div>
  );
}
