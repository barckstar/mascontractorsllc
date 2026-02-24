import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="bg-[#1e1e1e] min-h-screen flex items-center justify-center px-6">
            <div className="text-center max-w-2xl mx-auto">
                {/* 404 Number */}
                <h1 className="text-[8rem] md:text-[12rem] font-contrax text-[#9fe300] leading-none mb-0 drop-shadow-[0_0_40px_rgba(159,227,0,0.3)] animate-pulse-slow">
                    404
                </h1>

                <h2 className="text-2xl md:text-4xl font-contrax text-white mb-6 uppercase tracking-wider">
                    Page Not Found
                </h2>

                <p className="text-gray-400 font-atpinko text-lg mb-12 leading-relaxed">
                    Sorry, the page you are looking for does not exist or has been moved.
                    Browse our site using the links below to find what you need.
                </p>

                {/* Internal Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <Link
                        href="/"
                        className="bg-[#252525] border border-white/10 rounded-2xl p-5 hover:border-[#9fe300]/50 hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <span className="block text-[#9fe300] font-contrax text-sm mb-1 group-hover:text-white transition-colors">Home</span>
                        <span className="block text-gray-500 font-atpinko text-xs">Main page</span>
                    </Link>
                    <Link
                        href="/services"
                        className="bg-[#252525] border border-white/10 rounded-2xl p-5 hover:border-[#9fe300]/50 hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <span className="block text-[#9fe300] font-contrax text-sm mb-1 group-hover:text-white transition-colors">Services</span>
                        <span className="block text-gray-500 font-atpinko text-xs">What we do</span>
                    </Link>
                    <Link
                        href="/gallery"
                        className="bg-[#252525] border border-white/10 rounded-2xl p-5 hover:border-[#9fe300]/50 hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <span className="block text-[#9fe300] font-contrax text-sm mb-1 group-hover:text-white transition-colors">Gallery</span>
                        <span className="block text-gray-500 font-atpinko text-xs">Our work</span>
                    </Link>
                    <Link
                        href="/contact"
                        className="bg-[#252525] border border-white/10 rounded-2xl p-5 hover:border-[#9fe300]/50 hover:-translate-y-1 transition-all duration-300 group"
                    >
                        <span className="block text-[#9fe300] font-contrax text-sm mb-1 group-hover:text-white transition-colors">Contact</span>
                        <span className="block text-gray-500 font-atpinko text-xs">Get in touch</span>
                    </Link>
                </div>

                {/* Primary CTA */}
                <Link
                    href="/"
                    className="inline-block bg-[#9fe300] text-[#1e1e1e] font-contrax py-4 px-10 rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(159,227,0,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                >
                    GO TO HOME PAGE
                </Link>
            </div>
        </div>
    );
}