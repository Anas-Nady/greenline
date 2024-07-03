import { CONTACT_US_INFO } from "@/constants/ContactUs";

export default function ContactUsInfo() {
  return (
    <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
      <ul className="flex flex-wrap">
        {CONTACT_US_INFO.map((contactInfo) => (
          <div
            key={contactInfo.id}
            className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12"
          >
            <div className="flex items-start gap-3">
              <div className="shrink-0">
                <div className="inline-block rounded-md bg-green-200 p-4 text-primary">
                  {contactInfo.icon}
                </div>
              </div>
              <div className="ml-6 grow">
                <p className="mb-2 font-bold text-lg">{contactInfo.label}</p>
                {contactInfo.data.map((item) => (
                  <p key={item.id} className="text-sm text-neutral-500">
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
