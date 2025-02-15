import { useContext, useState } from 'react';
import { cn } from '@/util/Cn';
import TitleFormController from '@/components/ResumeBuilder/Builder/Sections/TitleForm/TitleFormController';
import EllipsisMenu from '../../../../EllipsisMenu';
import MenuItemButton from '@/components/MenuItemButton';
import { ISectionTitle } from '@/types/Resume';
import SectionContext from '@/components/ResumeBuilder/Builder/Sections/SectionContext';
import TitleFormModal from '@/components/ResumeBuilder/Builder/Sections/TitleFormModal';
import ResumeContext from '@/components/ResumeBuilder/Builder/ResumeContext';
import { merriweather } from '@/util/Fonts';

interface IProps {
  menu?: boolean;
}

export default function Title({ menu = true }: IProps) {
  const resumeController = useContext(ResumeContext);
  const sectionController = useContext(SectionContext);
  const title = sectionController.state.section.title;
  const [showModal, setShowModal] = useState(false);
  const [controller, setController] = useState(new TitleFormController());

  function onClickEditTitle() {
    const controller = new TitleFormController();
    controller.reset({ title });
    setController(controller);
    setShowModal(true);
  }

  function onChangeTitleForm(form: ISectionTitle) {
    sectionController.onChangeTitleForm(form);
    setShowModal(false);
  }

  return (
    <>
      <div
        className={cn(
          'font-bold text-2xl flex items-center',
          merriweather.className,
        )}
      >
        <div className="grow">{title}</div>
        {menu && (
          <div className="shrink-0">
            <EllipsisMenu buttonClassName="h-10">
              <MenuItemButton onClick={onClickEditTitle}>
                Edit Title
              </MenuItemButton>
              <MenuItemButton
                onClick={() =>
                  resumeController.onMoveUpSection(sectionController.id)
                }
              >
                Move Up
              </MenuItemButton>
              <MenuItemButton
                onClick={() =>
                  resumeController.onMoveDownSection(sectionController.id)
                }
              >
                Move Down
              </MenuItemButton>
            </EllipsisMenu>
          </div>
        )}
      </div>
      <TitleFormModal
        open={showModal}
        onClose={() => setShowModal(false)}
        controller={controller}
        onSubmit={onChangeTitleForm}
      />
    </>
  );
}
