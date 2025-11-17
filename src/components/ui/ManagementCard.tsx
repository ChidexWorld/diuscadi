import { ManagementItem } from "../admin/ManagementItem";

export default function ManagementCard({
  title,
  description,
  icon: Icon,
  href,
  color,
  hoverColor,
}: ManagementItem) {
  return (
    <a
      href={href}
      className="group bg-white rounded-xl border border-zinc-200 p-6 hover:shadow-lg transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div
          className={`${color} ${hoverColor} p-3 rounded-lg transition-colors`}
        >
          <Icon size={24} className="text-white" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-zinc-900 mb-1 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-zinc-600">{description}</p>
        </div>

        <svg
          className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600 group-hover:translate-x-1 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </a>
  );
}
