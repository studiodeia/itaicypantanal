import * as Icons from "@/lib/icons";
import type { LucideIcon } from "@/lib/icons";

const iconMap: Record<string, LucideIcon> = {
  ArrowDown: Icons.ArrowDown,
  ArrowLeft: Icons.ArrowLeft,
  ArrowRight: Icons.ArrowRight,
  Bath: Icons.Bath,
  BedDouble: Icons.BedDouble,
  BedSingle: Icons.BedSingle,
  Bird: Icons.Bird,
  Camera: Icons.Camera,
  Check: Icons.Check,
  ChevronDown: Icons.ChevronDown,
  ChevronLeft: Icons.ChevronLeft,
  ChevronRight: Icons.ChevronRight,
  ChevronUp: Icons.ChevronUp,
  Circle: Icons.Circle,
  Compass: Icons.Compass,
  Droplets: Icons.Droplets,
  Fence: Icons.Fence,
  Fish: Icons.Fish,
  Flower2: Icons.Flower2,
  GlassWater: Icons.GlassWater,
  Heart: Icons.Heart,
  Mail: Icons.Mail,
  MapPin: Icons.MapPin,
  Phone: Icons.Phone,
  Recycle: Icons.Recycle,
  Ruler: Icons.Ruler,
  Sailboat: Icons.Sailboat,
  Search: Icons.Search,
  Shield: Icons.Shield,
  ShieldCheck: Icons.ShieldCheck,
  Snowflake: Icons.Snowflake,
  Sprout: Icons.Sprout,
  Star: Icons.Star,
  Sunrise: Icons.Sunrise,
  User: Icons.User,
  Users: Icons.Users,
  UtensilsCrossed: Icons.UtensilsCrossed,
  Waves: Icons.Waves,
  Wifi: Icons.Wifi,
};

export function resolveIcon(name: string): LucideIcon {
  return iconMap[name] ?? Icons.Circle;
}
