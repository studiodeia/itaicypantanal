import { forwardRef, type ComponentType } from "react";
import type { IconProps as PhosphorIconProps, IconWeight } from "@phosphor-icons/react";
import {
  Airplane as PhAirplane,
  ArrowDown as PhArrowDown,
  ArrowLeft as PhArrowLeft,
  ArrowRight as PhArrowRight,
  Bathtub as PhBathtub,
  Bed as PhBed,
  Bird as PhBird,
  CalendarBlank as PhCalendarBlank,
  Camera as PhCamera,
  CaretDown as PhCaretDown,
  CaretLeft as PhCaretLeft,
  CaretRight as PhCaretRight,
  CaretUp as PhCaretUp,
  Check as PhCheck,
  Circle as PhCircle,
  CloudRain as PhCloudRain,
  Compass as PhCompass,
  Dot as PhDot,
  DotsSixVertical as PhDotsSixVertical,
  DotsThree as PhDotsThree,
  Drop as PhDrop,
  EnvelopeSimple as PhEnvelopeSimple,
  FacebookLogo as PhFacebookLogo,
  Fish as PhFish,
  FlowerLotus as PhFlowerLotus,
  ForkKnife as PhForkKnife,
  Heart as PhHeart,
  InstagramLogo as PhInstagramLogo,
  Leaf as PhLeaf,
  List as PhList,
  MagnifyingGlass as PhMagnifyingGlass,
  MapPin as PhMapPin,
  NavigationArrow as PhNavigationArrow,
  Phone as PhPhone,
  PintGlass as PhPintGlass,
  Plant as PhPlant,
  Recycle as PhRecycle,
  Ruler as PhRuler,
  Sailboat as PhSailboat,
  Shield as PhShield,
  ShieldCheck as PhShieldCheck,
  Sidebar as PhSidebar,
  Snowflake as PhSnowflake,
  Star as PhStar,
  Sun as PhSun,
  SunHorizon as PhSunHorizon,
  User as PhUser,
  Users as PhUsers,
  Wall as PhWall,
  Waves as PhWaves,
  WifiHigh as PhWifiHigh,
  X as PhX,
  YoutubeLogo as PhYoutubeLogo,
} from "@phosphor-icons/react";

type IconCompatProps = Omit<PhosphorIconProps, "weight"> & {
  strokeWidth?: number;
  absoluteStrokeWidth?: boolean;
};

export type LucideIcon = ReturnType<typeof createOutlineIcon>;

function resolveWeight(strokeWidth?: number): IconWeight {
  if (!strokeWidth) return "regular";
  if (strokeWidth <= 1.5) return "light";
  if (strokeWidth >= 2.5) return "bold";
  return "regular";
}

function createOutlineIcon(Icon: ComponentType<PhosphorIconProps>) {
  return forwardRef<SVGSVGElement, IconCompatProps>(
    ({ strokeWidth, absoluteStrokeWidth: _absolute, ...props }, ref) => {
      return (
        <Icon
          ref={ref}
          weight={resolveWeight(strokeWidth)}
          {...props}
        />
      );
    },
  );
}

export const ArrowDown = createOutlineIcon(PhArrowDown);
export const ArrowLeft = createOutlineIcon(PhArrowLeft);
export const ArrowLeftIcon = createOutlineIcon(PhArrowLeft);
export const ArrowRight = createOutlineIcon(PhArrowRight);
export const Bath = createOutlineIcon(PhBathtub);
export const BedDouble = createOutlineIcon(PhBed);
export const BedSingle = createOutlineIcon(PhBed);
export const Bird = createOutlineIcon(PhBird);
export const CalendarIcon = createOutlineIcon(PhCalendarBlank);
export const Camera = createOutlineIcon(PhCamera);
export const Check = createOutlineIcon(PhCheck);
export const ChevronDown = createOutlineIcon(PhCaretDown);
export const CloudRain = createOutlineIcon(PhCloudRain);
export const ChevronDownIcon = createOutlineIcon(PhCaretDown);
export const ChevronLeft = createOutlineIcon(PhCaretLeft);
export const ChevronRight = createOutlineIcon(PhCaretRight);
export const ChevronRightIcon = createOutlineIcon(PhCaretRight);
export const ChevronUp = createOutlineIcon(PhCaretUp);
export const Circle = createOutlineIcon(PhCircle);
export const Compass = createOutlineIcon(PhCompass);
export const Dot = createOutlineIcon(PhDot);
export const Droplets = createOutlineIcon(PhDrop);
export const Fence = createOutlineIcon(PhWall);
export const Facebook = createOutlineIcon(PhFacebookLogo);
export const Fish = createOutlineIcon(PhFish);
export const Flower2 = createOutlineIcon(PhFlowerLotus);
export const GlassWater = createOutlineIcon(PhPintGlass);
export const GripVertical = createOutlineIcon(PhDotsSixVertical);
export const Heart = createOutlineIcon(PhHeart);
export const Instagram = createOutlineIcon(PhInstagramLogo);
export const Leaf = createOutlineIcon(PhLeaf);
export const Mail = createOutlineIcon(PhEnvelopeSimple);
export const MapPin = createOutlineIcon(PhMapPin);
export const MenuIcon = createOutlineIcon(PhList);
export const Navigation = createOutlineIcon(PhNavigationArrow);
export const MoreHorizontal = createOutlineIcon(PhDotsThree);
export const PanelLeft = createOutlineIcon(PhSidebar);
export const Phone = createOutlineIcon(PhPhone);
export const Plane = createOutlineIcon(PhAirplane);
export const Recycle = createOutlineIcon(PhRecycle);
export const Ruler = createOutlineIcon(PhRuler);
export const Sailboat = createOutlineIcon(PhSailboat);
export const Search = createOutlineIcon(PhMagnifyingGlass);
export const Shield = createOutlineIcon(PhShield);
export const ShieldCheck = createOutlineIcon(PhShieldCheck);
export const Snowflake = createOutlineIcon(PhSnowflake);
export const Sprout = createOutlineIcon(PhPlant);
export const Star = createOutlineIcon(PhStar);
export const Sun = createOutlineIcon(PhSun);
export const Sunrise = createOutlineIcon(PhSunHorizon);
export const User = createOutlineIcon(PhUser);
export const Users = createOutlineIcon(PhUsers);
export const UtensilsCrossed = createOutlineIcon(PhForkKnife);
export const Waves = createOutlineIcon(PhWaves);
export const Wifi = createOutlineIcon(PhWifiHigh);
export const X = createOutlineIcon(PhX);
export const XIcon = createOutlineIcon(PhX);
export const Youtube = createOutlineIcon(PhYoutubeLogo);
