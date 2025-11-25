import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Icon } from "../components/UI";

const slides = [
  {
    id: 1,
    title: "Take Control of Your Credit",
    desc: "Track all your credit card debt in one place and build a smart plan to pay it off faster.",
    icon: "credit_score",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFsSyb05vofbgA_b_PtWgae8cujk-SOh_cMyIswT8L8nMNOn6yrh4X8EAhHx8hhYlkzU1vZB0K_WH8V_MZGobZ47bxSkE_A5G4AqYYiO5dlOW1Jkyc-I8f6xeHqbZy-sCAISLUY9qrJXNSYjUP3JHSkWIpC73a7N25AgXjb2SOCgXOVhR1ynMwi3nQW6gaVqdq-CJT9gdjf5e7y1wOYmk4XHdeoA0-KXZ2MlMe8XUVH53mnB60WVPMVe5FNpHOl5nWRmxK2dgoncM"
  },
  {
    id: 2,
    title: "See Your Full Debt Picture",
    desc: "Consolidate all your credit card balances into one easy-to-read dashboard.",
    icon: "visibility",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLqN6vOQFRmaNBtkjGFm6Ck3QH19QXydQB8JZsVwyLPX7HZTNbjlJy6SgKyiYbAmpKecrKa-u6Gid4L9A0MIdcwIvjwv06zDxKlwDFb9rJotK5vy-cxuTtUsyJZ34BLrleWP9rsZiO10wJXzCkyc0OAt_rodUx1FX1Fnl2XNb2fSZPp3mo7cr2A6OAx66Det1aj-BRFshQcueksrzcCLfseVRPjx3MicxYJqpxc_JycAuQdxfzn01nPR2d73UNRzoBaeenRajsoAo"
  },
  {
    id: 3,
    title: "Create Custom Payment Plans",
    desc: "Build a strategy to pay off debt quickly using Avalanche or Snowball methods.",
    icon: "edit_document",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCuMk-V2qmEkgBXKG8Sydsfa3GF1YjZF72BsD_ezzAk9uANSHAyoXqioDJyiWHR5o-6XTiBMaROmkeknBf6YTZ2E1F8mI4p8e0TzKrB__gmopP1DRtMM1N_3E0vgk4GoGzI0U1ikkMqN1hChRJrzRlRnpxKLOf5HDlIZk3-dCnhTwDdWWCeMsC_Xpy0-dhvC3zl6FTrS_ziyWVeTWjvjhqxsrTyWn9aPCAm2YSt19LHKFoIFWsd5sXR1RhoPvkrB5of5bfYTHDsoQ"
  }
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background p-4">
      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        <div className="relative flex aspect-square w-full max-w-sm items-center justify-center overflow-hidden rounded-full bg-secondary/30 p-8">
           <div className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-80" style={{ backgroundImage: `url(${slides[current].image})`}} />
        </div>

        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight">{slides[current].title}</h1>
          <p className="text-muted-foreground">{slides[current].desc}</p>
        </div>

        {/* Features Grid for First Slide Only */}
        {current === 0 && (
          <div className="w-full space-y-3">
            {[
              { icon: "visibility", title: "See Your Full Debt Picture", sub: "Consolidate balances" },
              { icon: "edit_document", title: "Create Payment Plans", sub: "Build a strategy" },
              { icon: "celebration", title: "Celebrate Progress", sub: "Watch debt shrink" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm">
                <Icon name={item.icon} className="text-primary text-2xl" />
                <div>
                  <h3 className="font-bold text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${
                i === current ? "w-6 bg-primary" : "w-2 bg-secondary"
              }`}
            />
          ))}
        </div>

        <Button size="lg" onClick={handleNext}>
          {current === slides.length - 1 ? "Get Started" : "Next"}
        </Button>
        <Button variant="ghost" size="lg" onClick={() => navigate("/login")}>
          Skip
        </Button>
      </div>
    </div>
  );
}
