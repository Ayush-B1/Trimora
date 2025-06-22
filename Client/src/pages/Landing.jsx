import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart, CheckCircle, Zap } from "lucide-react";
import { ModeToggle } from "../components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    className="bg-gray-50 p-6 rounded-lg"
    whileHover={{ scale: 1.05 }}
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    }}
  >
    <div className="flex items-center justify-center h-12 w-12 bg-primary/10 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

const TestimonialCard = ({ name, role, avatar, text }) => (
  <motion.div
    className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
    variants={{
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    }}
  >
    <p className="text-gray-600 dark:text-gray-400 mb-4">"{text}"</p>
    <div className="flex items-center">
      <Avatar className="h-10 w-10 mr-4">
        <AvatarImage src={avatar} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  </motion.div>
);

function Landing() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 font-sans">
      <header className="px-4 lg:px-6 h-16 flex items-center shadow-sm bg-white dark:bg-gray-900 sticky top-0 z-50">
        <Link to="/" className="font-bold text-2xl">
          Trimora
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <ModeToggle />
          <Link
            to="/about"
            className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
          >
            Login
          </Link>
          <Button asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          className="w-full py-20 md:py-32 relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-900 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e1e1e_1px,transparent_1px),linear-gradient(to_bottom,#1e1e1e_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <motion.div className="space-y-4" variants={itemVariants}>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
                  Manage Your SaaS Subscriptions Effortlessly
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-600 dark:text-gray-400 md:text-lg">
                  Trimora helps you track, manage, and optimize your software subscriptions, so you never overspend.
                </p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button size="lg" asChild>
                  <Link to="/signup">Get Started for Free <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="w-full py-20 md:py-24 bg-gray-50 dark:bg-gray-800/20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-4xl font-bold">Why Trimora?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">Everything you need to control your software stack.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Zap className="h-6 w-6 text-primary" />}
                title="Automated Tracking"
                description="Connect your accounts and let Trimora automatically detect and track all your subscriptions."
              />
              <FeatureCard
                icon={<BarChart className="h-6 w-6 text-primary" />}
                title="Spend Insights"
                description="Get a clear overview of your spending with detailed reports and visualizations."
              />
              <FeatureCard
                icon={<CheckCircle className="h-6 w-6 text-primary" />}
                title="Renewal Alerts"
                description="Never get caught off-guard by an unexpected renewal again. We'll alert you ahead of time."
              />
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          className="w-full py-20 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="container mx-auto px-4 md:px-6">
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h2 className="text-4xl font-bold">Loved by Teams Everywhere</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
                See what our users are saying about Trimora.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-8">
              <TestimonialCard
                name="Sarah Johnson"
                role="CTO, Innovate Inc."
                avatar="https://randomuser.me/api/portraits/women/44.jpg"
                text="Trimora has been a game-changer for our team. We've saved thousands on unused software and can finally see where our money is going."
              />
              <TestimonialCard
                name="Mike Chen"
                role="Founder, Tech Co."
                avatar="https://randomuser.me/api/portraits/men/32.jpg"
                text="I don't know how we managed before Trimora. The automated tracking and renewal alerts are indispensable."
              />
            </div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          className="w-full py-20 md:py-24 bg-gray-50 dark:bg-gray-800/20"
           initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="text-4xl font-bold">Ready to take control?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2 mb-6">
                Sign up for free and start managing your SaaS subscriptions today.
              </p>
              <Button size="lg" asChild>
                <Link to="/signup">Start My Free Trial</Link>
              </Button>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="flex justify-between items-center py-6 w-full shrink-0 px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 Trimora. All rights reserved.
        </p>
        <div className="flex gap-4">
            <Link to="/about" className="text-xs text-gray-500 hover:underline">About</Link>
            <Link to="/contact" className="text-xs text-gray-500 hover:underline">Contact</Link>
            <Link to="#" className="text-xs text-gray-500 hover:underline">Privacy Policy</Link>
            <Link to="#" className="text-xs text-gray-500 hover:underline">Terms of Service</Link>
        </div>
      </footer>
    </div>
  );
};

export default Landing;