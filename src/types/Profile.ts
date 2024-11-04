import { MongoDocument, MongoId } from '@/types/MongoDocument';
import { ReactElement } from 'react';

export enum ESocialLinkType {
  Facebook = 'facebook',
  YouTube = 'youtube',
  Instagram = 'instagram',
  WhatsApp = 'whatsapp',
  TikTok = 'tiktok',
  WeChat = 'wechat',
  Telegram = 'telegram',
  Snapchat = 'snapchat',
  Douyin = 'douyin',
  Kuaishou = 'kuaishou',
  X = 'x',
  Weibo = 'weibo',
  QQ = 'qq',
  Pinterest = 'pinterest',
  LinkedIn = 'linkedin',
  Other = 'other',
}

export enum EProfileItemType {
  Email = 'email',
  Phone = 'phone',
  Url = 'url',
}

export interface IProfileItem extends IBaseProfileProps<string> {
  type: EProfileItemType;
  label: string;
}

export interface ISocialItem extends IBaseProfileProps<string> {
  type: ESocialLinkType;
}

export interface IBaseProfileProps<T> {
  canDelete: boolean;
  canDisable: boolean;
  enabled: boolean;
  fieldName?: string;
  fieldIcon?: ReactElement;
  value: T;
}

export enum ETextItemType {
  Input = 'input',
  TextArea = 'textArea',
}

export interface ITextItem extends IBaseProfileProps<string> {
  fieldName: string;
  type: ETextItemType;
}

export enum EAvatarItemType {
  Image = 'image',
  Video = 'video',
}

export interface IAvatarItem extends IBaseProfileProps<MongoId[]> {
  type: EAvatarItemType;
}

export interface IEditableProfileFields {
  name: string;
  favorite: boolean;
}

export interface IProfile extends IEditableProfileFields, MongoDocument {
  userId?: MongoId;
  teamId: MongoId;
  fullName: ITextItem;
  title: ITextItem;
  items: IProfileItem[];
  avatars: IAvatarItem[];
  bio: ITextItem;
  socials: ISocialItem[];
  updatedAt?: Date;
}

export function newIProfile(): IProfile {
  return {
    teamId: '',
    name: 'New Profile',
    favorite: false,
    fullName: {
      canDelete: false,
      canDisable: false,
      enabled: true,
      fieldName: 'Name',
      type: ETextItemType.Input,
      value: '',
    },
    title: {
      canDelete: false,
      canDisable: true,
      enabled: true,
      fieldName: 'Title',
      type: ETextItemType.Input,
      value: '',
    },
    items: [
      {
        canDelete: false,
        canDisable: true,
        enabled: true,
        type: EProfileItemType.Phone,
        value: '',
        label: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: true,
        type: EProfileItemType.Email,
        value: '',
        label: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: true,
        type: EProfileItemType.Url,
        value: '',
        label: '',
      },
    ],
    avatars: [
      {
        canDelete: false,
        canDisable: false,
        enabled: true,
        fieldName: 'Image',
        type: EAvatarItemType.Image,
        value: [],
      },
    ],
    bio: {
      canDelete: false,
      canDisable: true,
      enabled: true,
      fieldName: 'Bio',
      type: ETextItemType.TextArea,
      value: '',
    },
    socials: [
      {
        canDelete: false,
        canDisable: true,
        enabled: false,
        type: ESocialLinkType.Facebook,
        value: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: false,
        type: ESocialLinkType.YouTube,
        value: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: false,
        type: ESocialLinkType.Instagram,
        value: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: false,
        type: ESocialLinkType.WhatsApp,
        value: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: false,
        type: ESocialLinkType.TikTok,
        value: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: false,
        type: ESocialLinkType.WeChat,
        value: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: false,
        type: ESocialLinkType.Telegram,
        value: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: false,
        type: ESocialLinkType.Snapchat,
        value: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: false,
        type: ESocialLinkType.Douyin,
        value: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: false,
        type: ESocialLinkType.Kuaishou,
        value: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: false,
        type: ESocialLinkType.X,
        value: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: false,
        type: ESocialLinkType.Weibo,
        value: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: false,
        type: ESocialLinkType.QQ,
        value: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: false,
        type: ESocialLinkType.Pinterest,
        value: '',
      },
      {
        canDelete: false,
        canDisable: true,
        enabled: false,
        type: ESocialLinkType.LinkedIn,
        value: '',
      },
    ],
  };
}
