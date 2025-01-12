import BuilderController from '@/components/ResumeBuilder/Builder/BuilderController';
import BuilderSection from '@/components/ResumeBuilder/Builder/Sections';
import {
  ERBType,
  newTSectionVisibility,
  TSectionVisibility,
} from '@/types/ResumeBuilder';
import Switch from '@/components/Switch';
import { useMemo } from 'react';

interface IProps {
  controller: BuilderController;
}

export default function Builder({ controller }: IProps) {
  controller.useController();

  // const { state } = controller;

  const isHidden: TSectionVisibility = useMemo(() => {
    const sectionControllers = controller.state.controllers;
    const out = newTSectionVisibility();

    for (const value of Object.values(ERBType)) {
      const index = sectionControllers.findIndex((v) => v.type() === value);

      if (index > -1) {
        out[value] = !sectionControllers[index].isHidden;
      }
    }

    return out;
  }, [controller.state.controllers]);

  return (
    <div>
      <div className="flex flex-col gap-y-6">
        {(controller.state?.controllers || []).map((v) => (
          <BuilderSection
            key={v.id}
            controller={v}
          />
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-y-3">
        <div className="flex">
          <div className="flex-1">
            <Switch
              checked={isHidden[ERBType.Custom]}
              onChange={() =>
                controller.onChangeSectionIsHidden(ERBType.Custom)
              }
            >
              <span>Custom Section</span>
            </Switch>
          </div>
          <div className="flex-1">
            <Switch
              checked={isHidden[ERBType.Course]}
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
              checked={isHidden[ERBType.Internship]}
              onChange={() =>
                controller.onChangeSectionIsHidden(ERBType.Internship)
              }
            >
              <span>Internships</span>
            </Switch>
          </div>
          <div className="flex-1">
            <Switch
              checked={isHidden[ERBType.Language]}
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
              checked={isHidden[ERBType.Reference]}
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
