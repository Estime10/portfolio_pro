import Image from "next/image";

/** Zone bas de hero : portrait + dégradé fond primary + blur. */
export function HeroLowerFade({ portraitSrc }: { portraitSrc: string }) {
  return (
    <div aria-hidden className="ui-hero-lower-zone min-h-[32vh] flex-1">
      <div className="ui-hero-lower-zone__media">
        <Image
          src={portraitSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="ui-hero-lower-zone__gradient" />
      <div className="ui-hero-lower-zone__blur" />
    </div>
  );
}
