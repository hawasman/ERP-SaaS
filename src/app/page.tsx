
import { Archive, CheckCircle, Globe, Headset, Landmark, Medal, Rocket, Users } from "lucide-react";
import Link from "next/link";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <div className="min-h-screen min-w-screen bg-slate-50">
        <div className=" bg-white">
          <nav className="flex items-center justify-between py-6 px-8 border-b">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl"><Rocket /></span>
              <span className="text-xl font-bold">ERPCloud</span>
            </div>
            <div className="flex items-center gap-8">
              <a className="hover:underline transition-all" href="#features">
                Features
              </a>
              <a className="hover:underline transition-all" href="#pricing">
                Pricing
              </a>
              <a className="hover:underline transition-all" href="#about">
                About
              </a>
              <Link href={"/sign-in"} className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-all">
                Get Started
              </Link>
            </div>
          </nav>

          <header className="py-20 px-8 text-center">
            <h1 className="text-6xl font-bold mb-6">Streamline Your Business Operations</h1>
            <p className="text-xl mb-10 max-w-2xl mx-auto">
              All-in-one cloud ERP solution to manage your entire business process from finance to inventory.
            </p>
            <div className="flex justify-center gap-4">
              <button className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition-all">
                Start Free Trial
              </button>
              <button className="border border-gray-300 px-8 py-3 rounded-full hover:bg-gray-50 transition-all">
                Book Demo
              </button>
            </div>
          </header>

          <section className="py-20 px-8 bg-gray-50">
            <div className="grid grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <span className="material-symbols-outlined text-4xl mb-4"><Archive /></span>
                <h3 className="text-xl font-bold mb-2">Inventory Management</h3>
                <p>Real-time tracking and optimization of your inventory levels.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <span className="material-symbols-outlined text-4xl mb-4"><Landmark /></span>
                <h3 className="text-xl font-bold mb-2">Financial Management</h3>
                <p>Comprehensive accounting and financial reporting tools.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all">
                <span className="material-symbols-outlined text-4xl mb-4"><Users /></span>
                <h3 className="text-xl font-bold mb-2">HR Management</h3>
                <p>Complete employee management and payroll solution.</p>
              </div>
            </div>
          </section>

          <section id="about" className="py-20 px-8 bg-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8">About ERPCloud</h2>
              <p className="text-xl mb-12">
                ERPCloud is a leading provider of cloud-based enterprise resource planning solutions, helping businesses
                of all sizes optimize their operations and drive growth.
              </p>
              <div className="grid grid-cols-3 gap-8 text-left">
                <div className="p-6 border rounded-xl hover:shadow-lg transition-all">
                  <span className="material-symbols-outlined text-3xl mb-4"><Medal /></span>
                  <h3 className="text-lg font-bold mb-2">10+ Years Experience</h3>
                  <p>Trusted by thousands of businesses worldwide.</p>
                </div>
                <div className="p-6 border rounded-xl hover:shadow-lg transition-all">
                  <span className="material-symbols-outlined text-3xl mb-4"><Globe /></span>
                  <h3 className="text-lg font-bold mb-2">Global Presence</h3>
                  <p>Operating in over 50 countries worldwide.</p>
                </div>
                <div className="p-6 border rounded-xl hover:shadow-lg transition-all">
                  <span className="material-symbols-outlined text-3xl mb-4"><Headset /></span>
                  <h3 className="text-lg font-bold mb-2">24/7 Support</h3>
                  <p>Round-the-clock expert assistance.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 px-8">
            <h2 className="text-4xl font-bold text-center mb-16">Simple, Transparent Pricing</h2>
            <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="border rounded-2xl p-8 hover:shadow-lg transition-all">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Basic</h3>
                  <p className="text-gray-600 mb-4">For small businesses</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <span className="material-symbols-outlined mr-2"><CheckCircle /></span>
                    Up to 5 users
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined mr-2"><CheckCircle /></span>
                    Basic inventory management
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined mr-2"><CheckCircle /></span>
                    Standard support
                  </li>
                </ul>
                <button className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition-all">
                  Get Started
                </button>
              </div>

              <div className="border rounded-2xl p-8 bg-blue-50 hover:shadow-lg transition-all relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm">
                  Most Popular
                </div>
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Professional</h3>
                  <p className="text-gray-600 mb-4">For growing businesses</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$199</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <span className="material-symbols-outlined mr-2"><CheckCircle /></span>
                    Up to 20 users
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined mr-2"><CheckCircle /></span>
                    Advanced inventory management
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined mr-2"><CheckCircle /></span>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined mr-2"><CheckCircle /></span>
                    Financial analytics
                  </li>
                </ul>
                <button className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition-all">
                  Get Started
                </button>
              </div>

              <div className="border rounded-2xl p-8 hover:shadow-lg transition-all">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                  <p className="text-gray-600 mb-4">For large organizations</p>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">$399</span>
                    <span className="text-gray-600 ml-2">/month</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center">
                    <span className="material-symbols-outlined mr-2"><CheckCircle /></span>
                    Unlimited users
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined mr-2"><CheckCircle /></span>
                    Custom modules
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined mr-2"><CheckCircle /></span>
                    24/7 dedicated support
                  </li>
                  <li className="flex items-center">
                    <span className="material-symbols-outlined mr-2"><CheckCircle /></span>
                    Advanced security
                  </li>
                </ul>
                <button className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition-all">
                  Contact Sales
                </button>
              </div>
            </div>
          </section>

          <footer className="py-12 px-8 border-t">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-2xl"><Rocket /></span>
                <span className="font-bold">ERPCloud</span>
              </div>
              <div className="flex gap-6">
                <i className="fa-brands fa-twitter text-xl hover:opacity-75 transition-all cursor-pointer"></i>
                <i className="fa-brands fa-linkedin text-xl hover:opacity-75 transition-all cursor-pointer"></i>
                <i className="fa-brands fa-github text-xl hover:opacity-75 transition-all cursor-pointer"></i>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </HydrateClient>
  );
}
