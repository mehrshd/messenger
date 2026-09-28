import { motion } from "framer-motion";

function InfoCard({ icon, label, value, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.2 }}
      whileHover={{ y: -3 }}
      className="rounded-2xl border border-white/6 bg-white/2.5 p-5 transition-colors hover:bg-white/4.5"
    >
      <div className="flex items-center gap-1.5 text-white/40">
        {icon}

        <span className="text-[11px] uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className={`mt-2 truncate ${value ===  "No username selected" ? " font-medium text-white/20 text-[13px]" : "font-bold text-white/55 text-[17px]"}`}>
        {value}
      </p>
    </motion.div>
  );
}

function InfoRow({ icon, label, value, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/2.5 px-4 py-3.5"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/50">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-white/30">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-bold text-white/55">
          {value}
        </p>
      </div>
    </motion.div>
  );
}

export { InfoCard, InfoRow }