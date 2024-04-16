import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

export default function Page() {
    return (
        <div className="py-12 lg:py-24">
            <div className="container px-4 md:px-6">
                <div className="grid max-w-3xl gap-8 mx-auto items-start space-y-8 lg:gap-12 lg:max-w-5xl xl:space-y-10">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl">Terms of Service for Arboretum</h1>
                        <p className="text-gray-500 dark:text-gray-400">Last updated: April 6, 2024</p>
                    </div>
                    <div className="space-y-4">
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            Welcome to Arboretum (&quot;the App&quot;). These Terms of Service (&quot;Terms&quot;) govern your use of the App. By accessing or using the App, you agree to comply with these Terms. If you do not agree with these Terms, you may not use the App.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">1. Use of the App</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            Eligibility: You must be at least 18 years old to use the App. By using the App, you represent and warrant that you are at least 18 years old.

                            User Account: You may be required to create an account to access certain features of the App. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

                            Prohibited Conduct: You agree not to engage in any activity that interferes with or disrupts the operation of the App or its servers. This includes, but is not limited to, attempting to gain unauthorized access to the App or its servers, transmitting viruses or harmful code, or engaging in any form of hacking or phishing.                      </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">2. User Contributions</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            Initiatives: The App allows users to contribute to planting trees initiatives or create their own initiatives. By contributing to or creating initiatives, you agree to comply with any guidelines or requirements provided by Arboretum.

                            Accuracy of Information: You are solely responsible for the accuracy and legality of any information you contribute to the App, including information related to initiatives you create.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">3. Intellectual Property</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            Ownership: All content and materials available on the App, including text, graphics, logos, images, and software, are the property of Arboretum or its licensors and are protected by intellectual property laws.

                            License: Subject to these Terms, Arboretum grants you a limited, non-exclusive, non-transferable license to use the App for your personal, non-commercial use.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">4. Privacy</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            Your use of the App is subject to our Privacy Policy, which governs the collection, use, and disclosure of your personal information. By using the App, you consent to the collection and use of your information in accordance with our Privacy Policy.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">5. Disclaimer of Warranties</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            The App is provided on an &quot;as is&quot; and &quot;as available&quot; basis, without any warranties of any kind, express or implied. Arboretum does not warrant that the App will be uninterrupted or error-free, or that any defects will be corrected.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">6. Limitation of Liability</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            Arboretum shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the App, even if Arboretum has been advised of the possibility of such damages.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">7. Indemnification</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            You agree to indemnify, defend, and hold harmless Arboretum and its officers, directors, employees, and agents from and against any and all claims, liabilities, damages, losses, or expenses arising out of or in connection with your use of the App or your breach of these Terms.                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">8. Governing Law</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            These Terms shall be governed by and construed in accordance with the laws of Kenya, without regard to its conflict of law principles.                        </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">9. Changes to these Terms</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            Arboretum reserves the right to modify or revise these Terms at any time. Any changes will be effective immediately upon posting the revised Terms on the App. Your continued use of the App after the posting of any changes constitutes your acceptance of such changes.                             </p>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">Contact Us</h2>
                        <p className="text-gray-500 xl:text-xl/relaxed dark:text-gray-400">
                            If you have any questions or concerns about these Terms, please contact us at grish@arboretum.cloud.

                            Thank you for using Arboretum. Let&quot;s work together to make a positive impact on the environment.                       
                             </p>
                    </div>
                    <div className="grid gap-4">
                        <Link
                            className="inline-flex items-center space-x-2 text-sm font-medium text-gray-900 transition-colors hover:underline dark:text-gray-100 dark:hover:underline"
                            href="/privacy-policy"
                        >
                            <ArrowRightIcon className="w-4 h-4" />
                            View Privacy Policy
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
