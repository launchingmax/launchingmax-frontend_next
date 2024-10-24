import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface ITabSection {
  renderTab: (itemName: string) => void;
  tabItems: string[];
  className?: string;
  activeTab?: string;
}

const TabSection: React.FC<ITabSection> = ({
  tabItems,
  renderTab,
  className,
  activeTab,
}) => {
  return (
    <div className="flex justify-around w-full py-2 bg-white dark:bg-launchingBlack">
      <Tabs
        defaultValue={activeTab}
        onValueChange={(value: any) => renderTab(value)}
        className={cn("", className)}
      >
        <TabsList className="flex flex-row space-x-12 w-full">
          {tabItems?.map((item: string) => (
            <TabsTrigger value={item}>{item}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default TabSection;
