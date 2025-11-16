import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (

<motion.div
  className="min-h-screen w-full bg-sky-100 flex flex-col items-center justify-center px-6 text-center select-none"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>

  {/* Dramatic 404 */}
  <motion.h1
    className="text-7xl md:text-9xl font-poor-story text-black mb-6"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    404
  </motion.h1>

  {/* Poetic Blockquote */}
  <motion.blockquote
    className="text-xl md:text-3xl text-gray-800 font-poor-story italic leading-relaxed max-w-3xl"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.2 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    “Even pages, once written, can be lost in the long night.  
    And some paths, no matter how fiercely you search,  
    refuse to return your footsteps.”
  </motion.blockquote>

  {/* Divider */}
  <motion.div
    className="w-48 border-t border-black my-8 opacity-40"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 1, delay: 0.4 }}
    viewport={{ once: true, amount: 0.3 }}
  ></motion.div>

  {/* Secondary Poem Line */}
  <motion.p
    className="text-lg md:text-xl text-gray-700 font-poor-story mb-10 max-w-xl"
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.6 }}
    viewport={{ once: true, amount: 0.3 }}
  >
    Mobile view is currently under construction. Please visit on a desktop for the full experience.
  </motion.p>

</motion.div>

  );
};

export default NotFound;