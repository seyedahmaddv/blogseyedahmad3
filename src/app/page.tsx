import Link from "next/link";
import Footer from "@/components/Footer";
import NewsletterSignup from "@/components/NewsletterSignup";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <motion.section 
          className="max-w-2xl w-full text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            به وبلاگ من خوش آمدید
          </motion.h2>
          <motion.p 
            className="text-gray-600 mb-6 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            اینجا می‌توانید نوشته‌های من را بخوانید، نظر دهید و با من در ارتباط باشید.
          </motion.p>
          <motion.div 
            className="flex justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link 
              href="/about" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              درباره ما
            </Link>
            <Link 
              href="/posts" 
              className="bg-white text-blue-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 border border-gray-200"
            >
              نوشته‌ها
            </Link>
          </motion.div>
        </motion.section>

        {/* Newsletter Signup */}
        <motion.section 
          className="w-full max-w-md mb-12"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <NewsletterSignup />
        </motion.section>

        <motion.section 
          className="w-full max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">آخرین نوشته‌ها</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "اولین پست تستی",
                excerpt: "این یک نمونه پست برای نمایش ظاهر بلاگ است.",
                link: "/posts/1"
              },
              {
                title: "دومین پست تستی",
                excerpt: "شما می‌توانید پست‌های بیشتری اضافه کنید و این بخش را پویا کنید.",
                link: "/posts/2"
              },
              {
                title: "سومین پست تستی",
                excerpt: "این بخش می‌تواند آخرین پست‌های منتشر شده را نمایش دهد.",
                link: "/posts/3"
              }
            ].map((post, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (index + 10) * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-6 flex flex-col h-full">
                  <h4 className="font-bold text-lg mb-3 text-gray-900">{post.title}</h4>
                  <p className="text-gray-600 mb-4 flex-grow">{post.excerpt}</p>
                  <Link 
                    href={post.link} 
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 self-start"
                  >
                    مشاهده →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
    </main>
      <Footer />
    </div>
  );
}
