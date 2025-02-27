'use client';
import ResumeController from '@/components/ResumeBuilder/Builder/ResumeController';
import Builder from '@/components/ResumeBuilder';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Loading from '@/components/Loading';
import Renderer from '@/components/ResumeBuilder/Renderer';
import ResumeContext from '@/components/ResumeBuilder/Builder/ResumeContext';
import useUser from '@/hooks/UseUser';
import LoginButton from '@/components/LoginButton';
import useSubscription from '@/hooks/UseSubscription';
import Button from '@/components/Buttton';
import Link from 'next/link';
import useWindowSizes from '@/hooks/UseWindowSizes';
import { cn } from '@/util/Cn';
import WarningAlert from '@/components/Alert/WarningAlert';
import emitter, { emitterMessage } from '@/util/Emitter';
import useLeavePageConfirm from '@/hooks/UseLeavePageConfirm';
import DashboardPageHeader from '@/components/DashboardPageHeader';

const SMALL_BREAK_POINT = 1024;

export default function ResumeView() {
  const user = useUser();
  const { resumeId } = useParams<{ resumeId: string }>();
  const subscription = useSubscription();
  const [controller] = useState(new ResumeController());
  const windowSizes = useWindowSizes();
  const [isSmall, setIsSmall] = useState(
    windowSizes.windowWidth < SMALL_BREAK_POINT,
  );
  const [previewIsVisible, setPreviewIsVisible] = useState(!isSmall);
  controller.useController();
  const isFullScreen = controller.state.isFullScreen;
  const userIsLoaded = user.isLoaded();

  useEffect(() => {
    if (!userIsLoaded) {
      return;
    }

    if (resumeId) {
      controller.loadId(resumeId);
      return;
    }
    controller
      .loadSession()
      .then((id) => window.history.pushState(null, '', '/resumes/' + id));
  }, [userIsLoaded]);

  useEffect(() => {
    if (isSmall && windowSizes.windowWidth >= SMALL_BREAK_POINT) {
      setIsSmall(false);
      setPreviewIsVisible(true);
      return;
    }

    if (!isSmall && windowSizes.windowWidth < SMALL_BREAK_POINT) {
      setIsSmall(true);
      setPreviewIsVisible(false);
      return;
    }
  }, [windowSizes.windowWidth]);

  useEffect(() => {
    const onResumeUpdated = () => controller.onResumeUpdated();
    const onSaveResume = () => controller.save();

    emitter.on(emitterMessage.resumeUpdated, onResumeUpdated);
    emitter.on(emitterMessage.saveResume, onSaveResume);

    return () => {
      emitter.off(emitterMessage.resumeUpdated, onResumeUpdated);
      emitter.off(emitterMessage.saveResume, onSaveResume);
    };
  }, []);

  useLeavePageConfirm(controller.state.dirty);

  const hasSubscription = subscription.hasSubscription();
  const renderHeight = windowSizes.windowHeight;

  // const [builderController] = useState(defaultBuilder);

  // const [loading, setLoading] = useState(true);
  // const [invite, setInvite] = useState<IHasId<IMember>>();
  // const user = useUser();
  // const { inviteId } = useParams<{ inviteId: string }>();
  // const inviteAccept = useInviteAccept(inviteId);
  // const router = useRouter();

  // useEffect(() => {
  //   if (!inviteAccept.loading && !inviteAccept.data) {
  //     router.push('/login');
  //     return;
  //   }
  //   if (!inviteAccept.loading && inviteAccept.data) {
  //     setInvite(inviteAccept.data);
  //     setLoading(false);
  //   }
  // }, [inviteAccept.loading]);

  // async function onClickSave() {
  //   const response = await controller.save();
  //   if (response) {
  //     toast.success('Resume saved.');
  //   }
  // }

  if (!userIsLoaded || controller.state.isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading size="lg" />
      </div>
    );
  }

  // const isLoggedIn = user.isLoggedIn();

  return (
    <div className="max-w-2xl mx-auto lg:max-w-full">
      <DashboardPageHeader title="Resume Builder" />
      <div className="flex flex-wrap md:flex-nowrap gap-y-2 gap-x-4 mb-3">
        {user.isLoaded() && !user.isLoggedIn() && (
          <WarningAlert className="lg:w-1/2">
            <div className="flex flex-wrap md:flex-nowrap items-center gap-x-2 gap-y-2 w-full">
              <div className="grow">
                <div className="max-w-lg">
                  To continue accessing this resume please log in or create an
                  account, it&apos;s free! Anonymous resumes are deleted after
                  12 hours.
                </div>
              </div>
              <div className="shrink-0">
                <LoginButton
                  variant="blue"
                  isInline
                />
              </div>
            </div>
          </WarningAlert>
        )}
        {subscription.isLoaded() && !hasSubscription && (
          <WarningAlert className="lg:w-1/2">
            <div className="flex flex-wrap md:flex-nowrap items-center gap-x-2 gap-y-2 w-full">
              <div className="grow">
                <div className="max-w-lg">
                  Demo mode is active. Exporting is disabled and the resume will
                  contain watermarks. For all features please subscribe.
                </div>
              </div>
              <div className="shrink-0">
                <Link href="/billing/plans">
                  <Button variant="blue">See plans</Button>
                </Link>
              </div>
            </div>
          </WarningAlert>
        )}
      </div>
      <ResumeContext.Provider value={controller}>
        <div className={'min-h-screen h-full flex gap-x-3'}>
          <div
            className={cn(
              'max-w-2xl mx-auto flex-1',
              isSmall && previewIsVisible ? 'hidden' : null,
            )}
          >
            <div className="pb-16">
              <Builder controller={controller} />
            </div>
          </div>
          <div
            className={cn(
              'flex-1 sticky top-0 max-w-2xl mx-auto',
              !previewIsVisible ? 'hidden' : null,
            )}
            style={{ height: renderHeight }}
          >
            <Renderer
              controller={controller}
              isFullScreen={isFullScreen}
              hasSubscription={hasSubscription}
              isVisible={previewIsVisible}
            />
          </div>
        </div>
        {!isFullScreen && (
          <div className="w-full fixed bottom-0 left-0 px-4 py-2 flex justify-end items-center z-10">
            {/*<div className="grow">*/}
            {/*  /!*<div>Last saved:</div>*!/*/}
            {/*  <div className="flex gap-x-2 items-center">*/}
            {/*    /!*{controller.state.lastSavedAt ? (*!/*/}
            {/*    /!*  <FormattedDate*!/*/}
            {/*    /!*    value={controller.state.lastSavedAt || undefined}*!/*/}
            {/*    /!*  />*!/*/}
            {/*    /!*) : (*!/*/}
            {/*    /!*  'Never'*!/*/}
            {/*    /!*)}*!/*/}

            {/*  </div>*/}
            {/*</div>*/}
            {/*<div className="shrink-0 flex gap-x-3">*/}
            {isSmall && (
              <Button
                variant="gray"
                isInline
                onClick={() => setPreviewIsVisible(!previewIsVisible)}
              >
                {previewIsVisible ? 'Hide' : 'Show'} Preview
              </Button>
            )}
            {/*<Tooltip*/}
            {/*  className="flex items-center"*/}
            {/*  icon={*/}
            {/*    <div className="size-6 ">*/}
            {/*      {controller.state.dirty ? (*/}
            {/*        <CircleDashed className="text-yellow-600 w-auto h-full" />*/}
            {/*      ) : (*/}
            {/*        <CircleIcon className="w-full h-full text-green-600 " />*/}
            {/*      )}*/}
            {/*    </div>*/}
            {/*  }*/}
            {/*>*/}
            {/*  <TooltipBox>*/}
            {/*    <div className="text-center">*/}
            {/*      {controller.state.dirty*/}
            {/*        ? 'There are unsaved changes.'*/}
            {/*        : 'Everything is up to date.'}*/}
            {/*    </div>*/}
            {/*  </TooltipBox>*/}
            {/*</Tooltip>*/}
            {/*<Button*/}
            {/*  variant="blue"*/}
            {/*  isInline*/}
            {/*  onClick={onClickSave}*/}
            {/*>*/}
            {/*  Save*/}
            {/*</Button>*/}
            {/*</div>*/}
          </div>
        )}
      </ResumeContext.Provider>
    </div>
  );
}
