import BuilderController from '@/components/ResumeBuilder/Builder/BuilderController';
import BuilderSection from '@/components/ResumeBuilder/Builder/Sections';
import { ERBType } from '@/types/ResumeBuilder';
import { useMemo } from 'react';
import Switch from '@/components/Switch';



interface IProps {
  controller: BuilderController;
}

export default function Builder({ controller }: IProps) {
  controller.useController();

  const hidden: THiddenSections = useMemo(() => {
    console.log('calc hidden');
    const controllers = controller.state.controllers;

    return {
      [ERBType.Custom]: !!(controllers.find(
        (v) => v.state?.section?.type === ERBType.Custom,
      )?.state.section.isHidden),
      [ERBType.Course]: !!controllers.find(
        (v) => v.state?.section?.type === ERBType.Course,
      )?.state.section.isHidden,
      [ERBType.ExtraCurricular]: !!controllers.find(
        (v) => v.state?.section?.type === ERBType.ExtraCurricular,
      )?.state.section.isHidden,
      [ERBType.Internship]: !!controllers.find(
        (v) => v.state?.section?.type === ERBType.Internship,
      )?.state.section.isHidden,
      [ERBType.Language]: !!controllers.find(
        (v) => v.state?.section?.type === ERBType.Language,
      )?.state.section.isHidden,
      [ERBType.Reference]: !!controllers.find(
        (v) => v.state?.section?.type === ERBType.Reference,
      )?.state.section.isHidden,
    };
  }, [controller.state.controllers]);

  console.log('hidden', hidden);

  return (
    <div>
      <div>
        {(controller.state?.controllers || []).map((v) => (
          <BuilderSection
            key={v.id}
            controller={v}
          />
        ))}
      </div>
      <div>
        <div className="flex">
          <div className="flex-1">
            <Switch
              checked={hidden.custom}
              onChange={() =>
                controller.onChangeSectionIsHidden(ERBType.Custom)
              }
            >
              <span>Custom Section</span>
            </Switch>
          </div>
          <div className="flex-1">
            <Switch
              checked={hidden.course}
              onChange={() =>
                controller.onChangeSectionIsHidden(ERBType.Course)
              }
            >
              <span>Courses</span>
            </Switch>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            <Switch
              checked={hidden.internship}
              onChange={() =>
                controller.onChangeSectionIsHidden(ERBType.Internship)
              }
            >
              <span>Internships</span>
            </Switch>
          </div>
          <div className="flex-1">
            <Switch
              checked={hidden.language}
              onChange={() =>
                controller.onChangeSectionIsHidden(ERBType.Language)
              }
            >
              <span>Languages</span>
            </Switch>
          </div>
        </div>
        <div className="flex">
          <div className="flex-1">
            <Switch
              checked={hidden.reference}
              onChange={() =>
                controller.onChangeSectionIsHidden(ERBType.Reference)
              }
            >
              <span>References</span>
            </Switch>
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    </div>
  );
}
