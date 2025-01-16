import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey, how is it going?", isSent: false },
  {
    id: 2,
    content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, libero?",
    isSent: true,
  },
];

function SettingsPage() {
  const { theme, setTheme } = useThemeStore();


  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="space-y-6">
        <div>Choose your theme</div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 md:grid-cols-8">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center transition-colors
              ${theme === t ? "bg-base-200" : "hover:bg-base-200/5"}`}
              onClick={() => setTheme(t)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-semibold group-hover:text-neutral/50 text-center truncate w-full">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="py-20 ">Preview</div>
      <div className="   p-4 border rounded-lg shadow-lg">
        <header className="flex items-center space-x-4 mb-4">
          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
            J
          </div>
          <div className="text-lg font-semibold">John Doe</div>
        </header>
        <div className="space-y-4">
          {PREVIEW_MESSAGES.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 rounded-lg ${msg.isSent ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`}
            >
              {msg.content}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg"
            placeholder="Type a message..."
            disabled
          />
          <button className="p-2 bg-blue-500 text-white rounded-lg" disabled>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
