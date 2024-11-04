import { useState } from 'react';
import memberService from '@/services/MemberService';

export default function useCurrentUserMember() {
  const [controller] = useState(memberService);
  controller.useController();

  return controller;
}
