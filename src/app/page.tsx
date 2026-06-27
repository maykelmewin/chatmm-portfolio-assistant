import { ResponsiveSidebar } from "@/components/ResponsiveSidebar";
import { Button } from "@/components/ui/button";
import { 
  Send, 
  Paperclip, 
  Smile, 
  Search, 
  Bell, 
  Info,
  Phone,
  Video,
  MoreVertical,
  Plus
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  return (
    <ResponsiveSidebar>
      <div className="flex flex-col h-full bg-background">
        {/* Chat Header */}
        <header className="flex items-center justify-between px-6 py-3 border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-background w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <Avatar className="border-2 border-background w-8 h-8">
                <AvatarImage src="https://github.com/leerob.png" />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h2 className="text-sm font-bold flex items-center gap-2">
                # engineering-team
                <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-normal">
                  Public
                </span>
              </h2>
              <p className="text-xs text-muted-foreground">42 members • 3 online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Info className="h-4 w-4" />
            </Button>
            <div className="w-px h-4 bg-border mx-1 hidden sm:block" />
            <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
              <Phone className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:flex">
              <Video className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 max-w-md mx-auto">
             <div className="h-20 w-20 rounded-2xl bg-muted flex items-center justify-center">
                <Plus className="h-10 w-10 text-muted-foreground" />
             </div>
             <div className="space-y-2">
                <h3 className="text-xl font-bold">Welcome to #engineering-team!</h3>
                <p className="text-sm text-muted-foreground">
                  This is the very beginning of the <strong>#engineering-team</strong> channel. 
                  Use this space to discuss architecture, reviews, and technical tasks.
                </p>
             </div>
             <Button variant="outline" size="sm">Add People</Button>
          </div>

          {/* Date Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground font-medium">Monday, June 25th</span>
            </div>
          </div>

          {/* Message 1 */}
          <div className="flex gap-4 group">
            <Avatar className="mt-0.5">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">shadcn</span>
                <span className="text-[10px] text-muted-foreground">10:42 AM</span>
              </div>
              <p className="text-sm leading-relaxed">
                Hey team! I've just pushed the initial sidebar implementation. It supports:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground ml-2">
                <li>Collapsible desktop state with tooltips</li>
                <li>Responsive mobile drawer using Shadcn Sheet</li>
                <li>Fluid animations and transitions</li>
              </ul>
            </div>
          </div>

          {/* Message 2 */}
          <div className="flex gap-4 group">
            <Avatar className="mt-0.5">
              <AvatarImage src="https://github.com/leerob.png" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">leerob</span>
                <span className="text-[10px] text-muted-foreground">10:45 AM</span>
              </div>
              <p className="text-sm leading-relaxed">
                Looks clean! The tooltip interaction in collapsed mode is super smooth. 
                I'll start working on the light/dark mode toggle integration next. 🚀
              </p>
              <div className="flex gap-2 mt-2">
                 <div className="bg-muted px-2 py-1 rounded-md text-xs flex items-center gap-1 border">
                    🔥 <span className="font-medium">3</span>
                 </div>
                 <div className="bg-muted px-2 py-1 rounded-md text-xs flex items-center gap-1 border">
                    💯 <span className="font-medium">1</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <footer className="p-4 border-t">
          <div className="max-w-4xl mx-auto border rounded-xl bg-muted/30 focus-within:ring-1 focus-within:ring-primary transition-all overflow-hidden">
            <div className="px-4 py-2 flex items-center gap-2 border-b bg-muted/10">
               <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Paperclip className="h-4 w-4" />
               </Button>
               <div className="h-4 w-px bg-border mx-1" />
               <Button variant="ghost" size="sm" className="h-7 text-[10px] font-bold">B</Button>
               <Button variant="ghost" size="sm" className="h-7 italic text-[10px] font-bold">I</Button>
               <Button variant="ghost" size="sm" className="h-7 line-through text-[10px] font-bold">S</Button>
            </div>
            <div className="flex items-end gap-2 p-3">
               <textarea 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm resize-none min-h-[40px] py-2 outline-none"
                  placeholder="Message #engineering-team"
               />
               <div className="flex items-center gap-2 pb-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button size="icon" className="h-8 w-8">
                    <Send className="h-4 w-4" />
                  </Button>
               </div>
            </div>
          </div>
          <p className="text-[10px] text-center text-muted-foreground mt-2">
            Press <strong>Enter</strong> to send, <strong>Shift + Enter</strong> for new line.
          </p>
        </footer>
      </div>
    </ResponsiveSidebar>
  );
}
