import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export default function Page() {
    return (
        <div className="py-12 lg:py-24">
            <div className="container px-4 md:px-6">
                <div className="grid max-w-3xl gap-8 mx-auto items-start space-y-8 lg:gap-12 lg:max-w-5xl xl:space-y-10">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">Privacy Policy for Arboretum</h1>
                        <p className="text-gray-500 dark:text-gray-400">Last updated: April 6, 2024</p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            Thank you for using Arboretum ("the App"). Our Privacy Policy explains how we collect, use, and disclose information about you. The terms of this
                            Privacy Policy apply to all users of our website, app, or other services. By accessing or using our
                            Service, you agree to the terms of this Privacy Policy.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Information We Collect</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            Personal Information: When you sign up for Arboretum, we collect personal information such as your name, email address, and any other information you choose to provide.

                            Contributions: If you choose to contribute to planting trees initiatives or create your own initiatives, we may collect information related to your contributions, including the amount contributed and the initiative you supported.

                            Usage Information: We collect information about how you use the App, including your interactions with the features and content offered.

                            Device Information: We may collect information about your device, including your device type, operating system, and unique device identifiers.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">How We Use Your Information</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            Providing Services: We use the information collected to provide, maintain, and improve the App, including facilitating contributions to planting trees initiatives.

                            Communications: We may use your email address to send you updates about the App, including notifications about new initiatives or changes to our policies.

                            Analytics: We may use your information for analytics purposes to understand how users interact with the App and to improve our services.

                            Legal Compliance: We may use your information to comply with applicable laws, regulations, or legal processes.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Information Security</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            We take the security of your information seriously and use industry-standard measures to protect it from
                            unauthorized access, disclosure, alteration, or destruction.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Third-Party Services</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            Our Service may contain links to third-party websites or services. We are not responsible for the
                            practices of those third parties, so we encourage you to read their privacy policies.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Cookies</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            We use cookies and similar tracking technologies to track the activity on our Service and hold certain
                            information. You have the option to accept or refuse these cookies.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Your Choices</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            Account Information: You can review and update your account information by logging into your account settings.
                            Communications Preferences: You can opt-out of receiving promotional emails from us by following the instructions provided in the emails.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Google OAuth2</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            Arboretum uses Google OAuth2 for user authentication. By using our App, you agree to Google's Terms of Service and Privacy Policy.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Brand Verification</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            We are in the process of getting our brand verified. Once verified, we will update this Privacy Policy accordingly.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Contact Us</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            If you have any questions about this Privacy Policy, please contact us at privacy@arboretum.cloud.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Changes to this Privacy Policy</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

                            By continuing to use the App after any changes to this Privacy Policy, you acknowledge and agree to the updated terms.

                            Thank you for trusting Arboretum with your information. Together, let's make a difference in the world by planting trees.
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <Link
                            className="inline-flex items-center space-x-2 text-sm font-medium text-gray-900 transition-colors hover:underline dark:text-gray-100 dark:hover:underline"
                            href="/tos"
                        >
                            <ArrowRightIcon className="w-4 h-4" />
                            View Terms of Service
                        </Link>
                        <Link
                            className="inline-flex items-center space-x-2 text-sm font-medium text-gray-900 transition-colors hover:underline dark:text-gray-100 dark:hover:underline"
                            href="/contact-us"
                        >
                            <ArrowRightIcon className="w-4 h-4" />
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
