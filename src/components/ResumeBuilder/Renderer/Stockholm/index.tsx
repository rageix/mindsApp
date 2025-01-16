import { IResume } from '@/types/Resume';
import MainBody
  from '@/components/ResumeBuilder/Renderer/Stockholm/Sections/MainBody';
import HeaderDetails
  from '@/components/ResumeBuilder/Renderer/Stockholm/Sections/HeaderDetails';

interface IProps {
  resume: IResume,
}

export default function Stockholm({resume}: IProps) {

  return (
    <div>
      <div>
        <HeaderDetails sections={resume.sections}/>
      </div>
      <div className="flex">
        <div className="w-3/4">
          <MainBody sections={resume.sections}/>
        </div>
        <div className="w-1/4">

        </div>

      </div>
    </div>
  )

}