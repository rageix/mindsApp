import BaseProfileItemFormController from '@/components/ProfilesView/ProfileEditor/ProfileItemForm/BaseProfileItemFormController';
import AvatarItemFormController from '@/components/ProfilesView/ProfileEditor/AvatarItemForm/AvatarItemFormController';
import TextItemFormController from '@/components/ProfilesView/ProfileEditor/TextItemForm/TextItemFormController';
import {
  EAvatarItemType,
  EProfileItemType,
  IAvatarItem,
  IProfileItem,
  ISocialItem,
  ITextItem,
} from '@/types/Profile';
import EmailProfileItemFormController from '@/components/ProfilesView/ProfileEditor/ProfileItemForm/EmailProfileItemFormController';
import PhoneProfileItemFormController from '@/components/ProfilesView/ProfileEditor/ProfileItemForm/PhoneProfileItemFormController';
import UrlProfileItemFormController from '@/components/ProfilesView/ProfileEditor/ProfileItemForm/UrlProfileItemFormController';
import SocialItemFormController from '@/components/ProfilesView/ProfileEditor/SocialItemForm/SocialItemFormController';
import BasicController from '@/util/BasicController';
import { nanoid } from 'nanoid';
import { MongoId } from '@/types/MongoDocument';
import { IDynamicForm, newIDynamicForm } from '@/types/DynamicForm';
import { postApiDynamicFormsFindOne } from '@/requests/api/dynamicForms/findOne';
import SectionController from '@/components/DynamicFormsView/DynamicFormEditor/Section/SectionController';

interface IState {
  id: string;
  _id?: MongoId;
  hasErrors: boolean;
  initLoad: boolean;

  sectionControllers: SectionController[];
}

export function newDefaultState(): IState {
  return {
    id: nanoid(),
    hasErrors: false,
    initLoad: false,
    sectionControllers: [],
  };
}

export default class DynamicFormEditorController extends BasicController<IState> {
  defaultState = newDefaultState();
  onUpdate: ((form: IDynamicForm) => void) | undefined;

  constructor(profileId: MongoId, teamId: MongoId) {
    super();
    this.loadId(profileId, teamId);
    // this.reset();
  }

  useController = (onUpdate: (form: IDynamicForm) => void) => {
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

  onClickNewSection = () => {
    const controller = new SectionController();
    this.setState({
      sectionControllers: [...this.state.sectionControllers, controller],
    });
  };

  load = (arg: IDynamicForm) => {
    console.log('load');
    const state = newDefaultState();
    state._id = arg._id;

    state.sectionControllers = (arg.sections || []).map((section) => {
      const controller = new SectionController();
      controller.load(section);
      return controller;
    });

    state.initLoad = true;

    this.setState(state);
  };

  onClickSave = () => {
    const state: IState = { ...this.state };

    // state.profileFieldsController.submit = true;
    // state.nameController.submit = true;
    // state.titleController.submit = true;
    // state.itemsControllers = state.itemsControllers.map((v) => {
    //   v.submit = true;
    //   return v;
    // });
    // state.avatarControllers = state.avatarControllers.map((v) => {
    //   v.submit = true;
    //   return v;
    // });
    // state.bioController.submit = true;
    // state.socialControllers = state.socialControllers.map((v) => {
    //   v.submit = true;
    //   return v;
    // });
    //
    // let hasErrors = false;
    //
    // if (!state.profileFieldsController.onValidateForm()) {
    //   hasErrors = true;
    // }
    //
    // if (!state.nameController.onValidateForm()) {
    //   hasErrors = true;
    // }
    //
    // if (!state.titleController.onValidateForm()) {
    //   hasErrors = true;
    // }
    //
    // for (const itemController of state.itemsControllers) {
    //   if (!itemController.onValidateForm()) {
    //     hasErrors = true;
    //   }
    // }
    //
    // for (const avatarController of state.avatarControllers) {
    //   if (!avatarController.onValidateForm()) {
    //     hasErrors = true;
    //   }
    // }
    //
    // if (!state.bioController.onValidateForm()) {
    //   hasErrors = true;
    // }
    //
    // for (const socialController of state.socialControllers) {
    //   if (!socialController.onValidateForm()) {
    //     hasErrors = true;
    //   }
    // }

    // state.hasErrors = hasErrors;

    this.setState(state);

    // if (!hasErrors) {
    //   if (this.onUpdate) {
    //     this.onUpdate(this.value());
    //   }
    // }
  };

  value = (): IDynamicForm => {
    return {
      _id: this.state._id,
      isActive: true,
      teamId: '',
      name: '',
      sections: [],
      // name: this.state.profileFieldsController.form.name,
      // favorite: this.state.profileFieldsController.form.favorite,
      // fullName: this.state.nameController.form,
      // title: this.state.titleController.form,
      // items: this.state.itemsControllers.map((v) => v.form),
      // avatars: this.state.avatarControllers.map((v) => v.form),
      // bio: this.state.bioController.form,
      // socials: this.state.socialControllers.map((v) => v.form),
    };
  };

  loadId = async (_id: MongoId, teamId: MongoId) => {
    if (_id === 'new') {
      this.load(newIDynamicForm(teamId));
      return;
    }

    const dynamicForm = await postApiDynamicFormsFindOne({ _id, teamId });

    if (dynamicForm) {
      this.load(dynamicForm);
    }
  };
}
