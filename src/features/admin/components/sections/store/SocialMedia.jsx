import { FieldDescription, FieldLegend } from "@/components/ui/field";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const socialFields = [
  {
    name: "facebook",
    label: "Facebook",
    placeholder: "https://facebook.com/your-page",
    pattern: /^https?:\/\/(www\.)?facebook\.com\/.+/i,
    message: "Enter a valid Facebook URL",
  },
  {
    name: "instagram",
    label: "Instagram",
    placeholder: "https://instagram.com/your-handle",
    pattern: /^https?:\/\/(www\.)?instagram\.com\/.+/i,
    message: "Enter a valid Instagram URL",
  },
  {
    name: "x",
    label: "X",
    placeholder: "https://x.com/your-handle",
    pattern: /^https?:\/\/(www\.)?(x|twitter)\.com\/.+/i,
    message: "Enter a valid X URL",
  },
  {
    name: "youtube",
    label: "YouTube",
    placeholder: "https://youtube.com/@your-channel",
    pattern: /^https?:\/\/(www\.)?youtube\.com\/.+/i,
    message: "Enter a valid YouTube URL",
  },
  {
    name: "tiktok",
    label: "TikTok",
    placeholder: "https://tiktok.com/@your-handle",
    pattern: /^https?:\/\/(www\.)?tiktok\.com\/.+/i,
    message: "Enter a valid TikTok URL",
  },
  {
    name: "pinterest",
    label: "Pinterest",
    placeholder: "https://pinterest.com/your-profile",
    pattern: /^https?:\/\/(www\.)?pinterest\.com\/.+/i,
    message: "Enter a valid Pinterest URL",
  },
];

export default function SocialMedia({ form }) {
  return (
    <div className="bg-card rounded-lg p-5">
      <FieldLegend>Social Media</FieldLegend>
      <FieldDescription>
        Add links to your store's social media profiles.
      </FieldDescription>

      <div className="mt-4 grid grid-cols-1 items-start gap-4 md:mt-6 md:grid-cols-2 md:gap-6">
        {socialFields.map(({ name, label, placeholder, pattern, message }) => (
          <FormField
            key={name}
            control={form.control}
            name={name}
            rules={{
              pattern: {
                value: pattern,
                message,
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">{label}</FormLabel>
                <FormControl>
                  <Input type="url" placeholder={placeholder} {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  );
}
