import { EditableProfileFieldsController } from '@/components/ProfilesView/ProfileEditor/EditableProfileFields/EditableProfileFieldsController';
import BaseProfileItemFormController from '@/components/ProfilesView/ProfileEditor/ProfileItemForm/BaseProfileItemFormController';
import AvatarItemFormController from '@/components/ProfilesView/ProfileEditor/AvatarItemForm/AvatarItemFormController';
import TextItemFormController from '@/components/ProfilesView/ProfileEditor/TextItemForm/TextItemFormController';
import {
  EAvatarItemType,
  EProfileItemType,
  IAvatarItem,
  IProfile,
  IProfileItem,
  ISocialItem,
  ITextItem,
  newIProfile,
} from '@/types/Profile';
import EmailProfileItemFormController from '@/components/ProfilesView/ProfileEditor/ProfileItemForm/EmailProfileItemFormController';
import PhoneProfileItemFormController from '@/components/ProfilesView/ProfileEditor/ProfileItemForm/PhoneProfileItemFormController';
import UrlProfileItemFormController from '@/components/ProfilesView/ProfileEditor/ProfileItemForm/UrlProfileItemFormController';
import SocialItemFormController from '@/components/ProfilesView/ProfileEditor/SocialItemForm/SocialItemFormController';
import BasicController from '@/util/BasicController';
import { nanoid } from 'nanoid';
import { MongoId } from '@/types/MongoDocument';
import { postApiProfilesFindOne } from '@/requests/api/profiles/findOne';

interface IState {
  id: string;
  _id?: MongoId;
  hasErrors: boolean;
  initLoad: boolean;
  profileFieldsController: EditableProfileFieldsController;
  nameController: TextItemFormController;
  titleController: TextItemFormController;
  itemsControllers: BaseProfileItemFormController[];
  avatarControllers: AvatarItemFormController[];
  bioController: TextItemFormController;
  socialControllers: SocialItemFormController[];
}

export function newDefaultState(): IState {
  return {
    id: nanoid(),
    hasErrors: false,
    initLoad: false,
    profileFieldsController: new EditableProfileFieldsController(),
    nameController: new TextItemFormController(),
    titleController: new TextItemFormController(),
    itemsControllers: [],
    avatarControllers: [],
    bioController: new TextItemFormController(),
    socialControllers: [],
  };
}

export default class ProfileEditorController extends BasicController<IState> {
  defaultState = newDefaultState();
  onUpdate: ((form: IProfile) => void) | undefined;

  constructor(profileId: MongoId, teamId: MongoId) {
    super();
    console.log('ProfileEditorController', 'constructor');
    this.loadId(profileId, teamId);
    // this.reset();
  }

  useController = (onUpdate: (form: IProfile) => void) => {
    this._useController();
    this.onUpdate = onUpdate;
  };

  newTextItemController = (item: ITextItem): TextItemFormController => {
    const controller = new TextItemFormController();
    controller.setForm(item);
    return controller;
  };

  newItemController = (item: IProfileItem): BaseProfileItemFormController => {
    let controller: BaseProfileItemFormController;

    switch (item.type) {
      case EProfileItemType.Email:
        controller = new EmailProfileItemFormController();
        break;
      case EProfileItemType.Url:
        controller = new UrlProfileItemFormController();
        break;
      case EProfileItemType.Phone:
        controller = new PhoneProfileItemFormController();
    }

    controller.setForm(item);
    return controller;
  };

  newAvatarItemController = (item: IAvatarItem): AvatarItemFormController => {
    let controller: AvatarItemFormController;

    switch (item.type) {
      case EAvatarItemType.Image:
      case EAvatarItemType.Video:
        controller = new AvatarItemFormController();
    }

    controller.setForm(item);
    return controller;
  };

  newSocialItemController = (item: ISocialItem): SocialItemFormController => {
    const controller = new SocialItemFormController();
    controller.setForm(item);
    return controller;
  };

  load = (arg: IProfile) => {
    const state = newDefaultState();
    state._id = arg._id;
    state.profileFieldsController = new EditableProfileFieldsController();
    state.profileFieldsController.setForm(arg);

    state.nameController = this.newTextItemController(arg.fullName);
    state.titleController = this.newTextItemController(arg.title);

    state.itemsControllers = (arg.items || []).map((item) => {
      return this.newItemController(item);
    });

    state.avatarControllers = (arg.avatars || []).map((avatar) => {
      return this.newAvatarItemController(avatar);
    });

    state.bioController = this.newTextItemController(arg.bio);

    state.socialControllers = (arg.socials || []).map((social) => {
      return this.newSocialItemController(social);
    });

    state.initLoad = true;

    this.setState(state);
  };

  onClickSave = () => {
    const state = { ...this.state };

    state.profileFieldsController.submit = true;
    state.nameController.submit = true;
    state.titleController.submit = true;
    state.itemsControllers = state.itemsControllers.map((v) => {
      v.submit = true;
      return v;
    });
    state.avatarControllers = state.avatarControllers.map((v) => {
      v.submit = true;
      return v;
    });
    state.bioController.submit = true;
    state.socialControllers = state.socialControllers.map((v) => {
      v.submit = true;
      return v;
    });

    let hasErrors = false;

    if (!state.profileFieldsController.onValidateForm()) {
      hasErrors = true;
    }

    if (!state.nameController.onValidateForm()) {
      hasErrors = true;
    }

    if (!state.titleController.onValidateForm()) {
      hasErrors = true;
    }

    for (const itemController of state.itemsControllers) {
      if (!itemController.onValidateForm()) {
        hasErrors = true;
      }
    }

    for (const avatarController of state.avatarControllers) {
      if (!avatarController.onValidateForm()) {
        hasErrors = true;
      }
    }

    if (!state.bioController.onValidateForm()) {
      hasErrors = true;
    }

    for (const socialController of state.socialControllers) {
      if (!socialController.onValidateForm()) {
        hasErrors = true;
      }
    }

    state.hasErrors = hasErrors;

    this.setState(state);

    if (!hasErrors) {
      if (this.onUpdate) {
        this.onUpdate(this.value());
      }
    }
  };

  value = (): IProfile => {
    return {
      _id: this.state._id,
      teamId: '',
      name: this.state.profileFieldsController.form.name,
      favorite: this.state.profileFieldsController.form.favorite,
      fullName: this.state.nameController.form,
      title: this.state.titleController.form,
      items: this.state.itemsControllers.map((v) => v.form),
      avatars: this.state.avatarControllers.map((v) => v.form),
      bio: this.state.bioController.form,
      socials: this.state.socialControllers.map((v) => v.form),
    };
  };

  loadId = async (_id: MongoId, teamId: MongoId) => {
    if (_id === 'new') {
      this.load(newIProfile());
      return;
    }

    const profile = await postApiProfilesFindOne({ _id, teamId });

    if (profile) {
      this.load(profile);
    }
  };
}
