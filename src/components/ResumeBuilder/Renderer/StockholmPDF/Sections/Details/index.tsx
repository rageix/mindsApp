import { IRBDetail, IRBSection } from '@/types/Resume';
import { Link, StyleSheet, View } from '@react-pdf/renderer';
import SidebarTitle from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SidebarTitle';
import { calcStyles } from '@/util/CalcStyles';
import { useContext } from 'react';
import StyleContext from '@/components/ResumeBuilder/Renderer/StyleContext';
import SideBarSubsection from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SideBarSubsection';
import SideBarTextWrapper from '@/components/ResumeBuilder/Renderer/StockholmPDF/Elements/SideBarTextWrapper';

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

  const data = section.data[0] as IRBDetail;
  return (
    <View style={calcStyles(styles.container, styleContext)}>
      <SideBarSubsection>
        <SidebarTitle>Details</SidebarTitle>
        <View>
          {data.city && <SideBarTextWrapper>{data.city}</SideBarTextWrapper>}
          {data.country && (
            <SideBarTextWrapper>{data.country}</SideBarTextWrapper>
          )}
          {data.phone && <SideBarTextWrapper>{data.phone}</SideBarTextWrapper>}
          {data.email && (
            <SideBarTextWrapper>
              <Link href={`mailto:${data.email}`}>{data.email}</Link>
            </SideBarTextWrapper>
          )}
        </View>
      </SideBarSubsection>
      {/*  date place of birth */}
      {data.placeOfBirth && (
        <SideBarSubsection>
          <View>
            <SidebarTitle light>Place Of Birth</SidebarTitle>
          </View>
          <View>
            <SideBarTextWrapper>{data.placeOfBirth}</SideBarTextWrapper>
          </View>
        </SideBarSubsection>
      )}
      {data.dateOfBirth && (
        <SideBarSubsection>
          <View>
            <SidebarTitle light>Date Of Birth</SidebarTitle>
          </View>
          <View>
            <SideBarTextWrapper>{data.dateOfBirth}</SideBarTextWrapper>
          </View>
        </SideBarSubsection>
      )}
      {data.nationality && (
        <SideBarSubsection>
          <View>
            <SidebarTitle light>Nationality</SidebarTitle>
          </View>
          <View>
            <SideBarTextWrapper>{data.nationality}</SideBarTextWrapper>
          </View>
        </SideBarSubsection>
      )}
      {data.license && (
        <SideBarSubsection>
          <View>
            <SidebarTitle light>License</SidebarTitle>
          </View>
          <View>
            <SideBarTextWrapper>{data.license}</SideBarTextWrapper>
          </View>
        </SideBarSubsection>
      )}
    </View>
  );
}
