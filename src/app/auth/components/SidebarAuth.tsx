export default function SidebarLogin(){
    return(
        <div className="relative hidden flex-col bg-muted p-10 text-white dark:border-r lg:flex h-screen">
        <div className="absolute inset-0" 
         style={{
          backgroundImage: 'url(/image_background_digital.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: '90% 100%',
        }}
        />
        <div className="relative z-20 flex items-center text-lg font-medium">
          Avatar Speak
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;project developed with next.js and openai based for conversation with a voice chatbot
            &rdquo;
            </p>
            <footer className="text-sm">Developer Jose Blas</footer>
          </blockquote>
        </div>
      </div>
    )
}