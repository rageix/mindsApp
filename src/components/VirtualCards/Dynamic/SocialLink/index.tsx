import { ESocialLinkType, ISocialItem } from '@/types/Profile';
import { useMemo } from 'react';

interface IProps {
  social: ISocialItem;
}

export function SocialLink({ social }: IProps) {
  const label = useMemo(() => {
    switch (social.type) {
      case ESocialLinkType.Facebook:
        return 'Facebook';
      case ESocialLinkType.YouTube:
        return 'YouTube';
      case ESocialLinkType.Instagram:
        return 'Instagram';
      case ESocialLinkType.WhatsApp:
        return 'WhatsApp';
      case ESocialLinkType.TikTok:
        return 'TikTok';
      case ESocialLinkType.WeChat:
        return 'WeChat';
      case ESocialLinkType.Telegram:
        return 'Telegram';
      case ESocialLinkType.Snapchat:
        return 'Snapchat';
      case ESocialLinkType.Douyin:
        return 'Douyin';
      case ESocialLinkType.Kuaishou:
        return 'Kuaishou';
      case ESocialLinkType.X:
        return 'X';
      case ESocialLinkType.Weibo:
        return 'Weibo';
      case ESocialLinkType.QQ:
        return 'QQ';
      case ESocialLinkType.Pinterest:
        return 'Pinterest';
      case ESocialLinkType.LinkedIn:
        return 'LinkedIn';
      case ESocialLinkType.Other:
        return social.fieldName;
    }
  }, [social.type]);

  return (
    <p className="text-base leading-7 text-gray-200">
      <a
        href={social.value}
        target="_blank"
        rel="noreferrer"
      >
        {label}
      </a>
    </p>
  );
}
