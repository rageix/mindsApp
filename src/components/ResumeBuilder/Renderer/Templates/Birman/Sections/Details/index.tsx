import { IRBDetail, IRBSection } from '@/types/Resume';
import { Link, StyleSheet, View } from '@react-pdf/renderer';
import SidebarTitle from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SidebarTitle';
import { calcStyles } from '@/util/CalcStyles';
import { useContext } from 'react';
import StyleContext from '@/components/ResumeBuilder/Renderer/StyleContext';
import SideBarSubsection from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SideBarSubsection';
import SideBarTextWrapper from '@/components/ResumeBuilder/Renderer/Templates/Birman/Elements/SideBarTextWrapper';
import _ from 'lodash';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
});

interface IProps {
  section: IRBSection;
}

export default function Details({ section }: IProps) {
  const styleContext = useContext(StyleContext);

  if (section.isHidden) {
    return null;
  }

  const data = section.data[0] as IRBDetail;
  return (
    <View style={calcStyles(styles.container, styleContext)}>
      <SideBarSubsection>
        <SidebarTitle>Details</SidebarTitle>
        <View>
          {!_.isEmpty(data.city) && (
            <SideBarTextWrapper>{data.city}</SideBarTextWrapper>
          )}
          {!_.isEmpty(data.country) && (
            <SideBarTextWrapper>{data.country}</SideBarTextWrapper>
          )}
          {!_.isEmpty(data.phone) && (
            <SideBarTextWrapper>{data.phone}</SideBarTextWrapper>
          )}
          {!_.isEmpty(data.email) && (
            <SideBarTextWrapper>
              <Link href={`mailto:${data.email}`}>{data.email}</Link>
            </SideBarTextWrapper>
          )}
        </View>
      </SideBarSubsection>
      {!_.isEmpty(data.placeOfBirth) && (
        <SideBarSubsection>
          <View>
            <SidebarTitle>Place Of Birth</SidebarTitle>
          </View>
          <View>
            <SideBarTextWrapper>{data.placeOfBirth}</SideBarTextWrapper>
          </View>
        </SideBarSubsection>
      )}
      {!_.isEmpty(data.dateOfBirth) && (
        <SideBarSubsection>
          <View>
            <SidebarTitle>Date Of Birth</SidebarTitle>
          </View>
          <View>
            <SideBarTextWrapper>{data.dateOfBirth}</SideBarTextWrapper>
          </View>
        </SideBarSubsection>
      )}
      {!_.isEmpty(data.nationality) && (
        <SideBarSubsection>
          <View>
            <SidebarTitle>Nationality</SidebarTitle>
          </View>
          <View>
            <SideBarTextWrapper>{data.nationality}</SideBarTextWrapper>
          </View>
        </SideBarSubsection>
      )}
      {!_.isEmpty(data.license) && (
        <SideBarSubsection>
          <View>
            <SidebarTitle>License</SidebarTitle>
          </View>
          <View>
            <SideBarTextWrapper>{data.license}</SideBarTextWrapper>
          </View>
        </SideBarSubsection>
      )}
    </View>
  );
}
