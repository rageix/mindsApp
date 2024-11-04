'use client';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '@/util/Cn';
import { MongoId } from '@/types/MongoDocument';
import ProtectedImage from '@/components/ProtectedImage';

interface IProps {
  src?: string;
  _id?: MongoId;
}

export default function CardImage({ src, _id }: IProps) {
  const [showQr, setShowQr] = useState(false);
  const [hover, setHover] = useState(false);

  function onClick() {
    setShowQr(!showQr);
    setHover(false);
  }

  return (
    <span
      className="aspect-[4/5] w-52 h-[17.5rem] relative rounded-2xl overflow-hidden cursor-pointer"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/*<div*/}
      {/*  className={cn(*/}
      {/*    'rounded-2xl p-2 absolute z-20 top-2 right-2 bg-gray-900/30 text-white',*/}
      {/*    hover ? '' : 'hidden',*/}
      {/*  )}*/}
      {/*>*/}
      {/*  {!showQr && <QrCodeIcon size={20} />}*/}
      {/*  {showQr && <SquareUserRound size={20} />}*/}
      {/*</div>*/}
      <div
        className={cn(
          'absolute z-20 w-full h-full flex items-center justify-center bg-gray-900/70 text-white',
          hover ? '' : 'hidden',
        )}
      >
        {!showQr && <div>Click to show QR Code.</div>}
        {showQr && <div>Click to show image.</div>}
      </div>

      {showQr && (
        <div className="absolute h-full w-full flex items-center z-10 bg-white">
          <QRCodeSVG
            value={window.location.href}
            className="w-full h-auto"
            bgColor="transparent"
          />
        </div>
      )}
      {src && (
        <img
          alt=""
          src={src}
          className="h-full w-full object-cover"
        />
      )}
      {_id && (
        <ProtectedImage
          _id={_id}
          alt="Image"
          width="0"
          height="0"
          sizes="100vw"
          className="h-full w-full object-cover"
        />
      )}
    </span>
  );
}
