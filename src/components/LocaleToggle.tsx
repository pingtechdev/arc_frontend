import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/contexts/LocaleContext";

const LocaleToggle = () => {
  const { locale, setLocale } = useLocale();

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLocale}
      className="w-9 h-9 p-0"
    >
      <Languages className="h-4 w-4" />
      <span className="sr-only">Toggle language</span>
    </Button>
  );
};

export default LocaleToggle;