import { useState, useRef } from 'preact/hooks'
import emailjs from "@emailjs/browser"

type StatusType = {
    status: boolean,
    message: string
}

const ContactForm = () => {
    const [mailStatus, setMailStatus] = useState<StatusType>({ status: false, message: "" })
    const [isLoading, setisLoading] = useState<boolean>(false)

    const NameRef = useRef<HTMLInputElement>(null)
    const EmailRef = useRef<HTMLInputElement>(null)
    const MessageRef = useRef<HTMLTextAreaElement>(null)

    const HandleFormSubmit = async (e: SubmitEvent) => {
        e.preventDefault();

        if (!NameRef.current || !EmailRef.current || !MessageRef.current) return

        const name = NameRef?.current?.value as string;
        const email = EmailRef?.current?.value as string;
        const message = MessageRef?.current?.value as string;

        const templateParams = {
            from_name: name,
            from_email: email,
            message: message,
        }

        try {

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                throw new Error('🙄 Invalid Email ID!')
            }

            setisLoading(true)
            const mailRes = await emailjs.send(
                import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
                import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
                templateParams,
                import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
            );

            if (mailRes.status !== 200) {
                throw new Error("😵 Message not Sent")
            }

            setMailStatus({ status: true, message: "👍 Message Sent!" })
            setisLoading(false)

            NameRef.current.value = ""
            EmailRef.current.value = ""
            MessageRef.current.value = ""
        } catch (error: { message: string } | any) {
            setMailStatus({ status: false, message: error.message })
        } finally {
            setTimeout(() => {
                setMailStatus({ status: false, message: "" })
            }, 3000);
        }
    }

    return (
        <form onSubmit={HandleFormSubmit} className="w-full h-full flex flex-col gap-6 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md relative overflow-hidden group">
            {/* Form Glow Effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-[50px] group-hover:bg-primary/30 transition-all duration-500"></div>

            <div className="flex flex-col gap-2 relative z-10">
                <label htmlFor="name" className="text-white/80 font-medium ml-1">Name</label>
                <div className="relative group/input">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none text-white placeholder:text-white/20 focus:border-primary/50 focus:bg-white/10 transition-all duration-300"
                        autoComplete='name'
                        required
                        ref={NameRef}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover/input:opacity-100 pointer-events-none transition-opacity duration-300 -z-10 blur-sm"></div>
                </div>
            </div>

            <div className="flex flex-col gap-2 relative z-10">
                <label htmlFor="email" className="text-white/80 font-medium ml-1">Email</label>
                <div className="relative group/input">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none text-white placeholder:text-white/20 focus:border-primary/50 focus:bg-white/10 transition-all duration-300"
                        autoComplete='email'
                        required
                        ref={EmailRef}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover/input:opacity-100 pointer-events-none transition-opacity duration-300 -z-10 blur-sm"></div>
                </div>
            </div>

            <div className="flex flex-col gap-2 relative z-10">
                <label htmlFor="message" className="text-white/80 font-medium ml-1">Message</label>
                <div className="relative group/input">
                    <textarea
                        rows={5}
                        id="message"
                        name="message"
                        placeholder="Tell me about your project..."
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 outline-none text-white placeholder:text-white/20 focus:border-primary/50 focus:bg-white/10 transition-all duration-300 resize-none"
                        ref={MessageRef}
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-transparent opacity-0 group-hover/input:opacity-100 pointer-events-none transition-opacity duration-300 -z-10 blur-sm"></div>
                </div>
            </div>

            <div className="w-full flex justify-between items-center mt-2 relative z-10">
                <button
                    className="relative overflow-hidden group/btn flex items-center gap-3 bg-primary text-white font-medium py-3 px-8 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:hover:scale-100"
                    type="submit"
                    disabled={isLoading}
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                    {
                        isLoading ? (
                            <>
                                <span>Sending...</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-loader-2 animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                            </>
                        ) : (
                            <>
                                <span>Send Message</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send-horizontal group-hover/btn:translate-x-1 transition-transform duration-300"><path d="m3 3 3 9-3 9 19-9Z" /><path d="M6 12h16" /></svg>
                            </>
                        )
                    }
                </button>

                {mailStatus.message && (
                    <span className={`text-sm font-medium ${mailStatus.status ? 'text-green-400' : 'text-red-400'} animate-pulse`}>
                        {mailStatus.message}
                    </span>
                )}
            </div>
        </form>
    )
}

export default ContactForm