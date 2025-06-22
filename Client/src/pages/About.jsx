import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Target, Eye } from "lucide-react";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" } },
  };

  const team = [
    { name: "John Doe", role: "CEO & Co-Founder", avatar: "https://randomuser.me/api/portraits/men/46.jpg" },
    { name: "Jane Smith", role: "CTO & Co-Founder", avatar: "https://randomuser.me/api/portraits/women/46.jpg" },
    { name: "Mike Johnson", role: "Lead Developer", avatar: "https://randomuser.me/api/portraits/men/47.jpg" },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50">
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          className="w-full py-20 md:py-32 text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black tracking-tighter">About Trimora</motion.h1>
            <motion.p variants={itemVariants} className="mx-auto mt-4 max-w-[700px] text-gray-600 dark:text-gray-400 md:text-lg">
              We are on a mission to simplify SaaS management for teams everywhere.
            </motion.p>
          </div>
        </motion.section>

        {/* Mission and Vision Section */}
        <motion.section
          className="w-full py-20 md:py-24 bg-gray-50 dark:bg-gray-800/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-4 mb-4">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                To provide businesses with a clear, simple, and powerful tool to manage their software subscriptions, eliminating waste and maximizing value. We believe that with the right insights, every company can optimize its software stack and budget.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-4 mb-4">
                <Eye className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                We envision a world where technology works for businesses, not the other way around. Our goal is to be the central hub for SaaS management, empowering teams to make smarter decisions about the tools they use every day.
              </p>
            </motion.div>
          </div>
        </motion.section>


        {/* Team Section */}
        <motion.section
          className="w-full py-20 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <Users className="h-10 w-10 mx-auto text-primary mb-4" />
              <h2 className="text-4xl font-bold">Meet the Team</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">The people behind Trimora.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member) => (
                <motion.div key={member.name} className="text-center" variants={itemVariants}>
                  <Avatar className="h-32 w-32 mx-auto mb-4">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default About; 