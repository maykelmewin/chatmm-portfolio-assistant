import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export default function DesignSystemPage() {
  const colors = [
    { variable: "--background", light: "#F7F7F8", dark: "#0A0A0A", type: "bg" },
    { variable: "--foreground", light: "#0A0A0A", dark: "#EDEDED", type: "text" },
    { variable: "--card", light: "rgb(255 255 255 / 0.7)", dark: "rgb(255 255 255 / 0.03)", type: "bg" },
    { variable: "--card-foreground", light: "#0A0A0A", dark: "#EDEDED", type: "text" },
    { variable: "--popover", light: "rgb(255 255 255 / 0.9)", dark: "rgb(255 255 255 / 0.03)", type: "bg" },
    { variable: "--popover-foreground", light: "#0A0A0A", dark: "#EDEDED", type: "text" },
    { variable: "--primary", light: "#2ECC5A", dark: "#16a34a", type: "bg" },
    { variable: "--primary-foreground", light: "#ffffff", dark: "#0A0A0A", type: "text" },
    { variable: "--secondary", light: "rgb(0 0 0 / 0.04)", dark: "rgb(255 255 255 / 0.04)", type: "bg" },
    { variable: "--secondary-foreground", light: "#0A0A0A", dark: "#EDEDED", type: "text" },
    { variable: "--muted", light: "rgb(0 0 0 / 0.03)", dark: "rgb(255 255 255 / 0.04)", type: "bg" },
    { variable: "--muted-foreground", light: "rgb(0 0 0 / 0.55)", dark: "rgb(255 255 255 / 0.6)", type: "text" },
    { variable: "--accent", light: "rgb(0 0 0 / 0.05)", dark: "rgb(255 255 255 / 0.06)", type: "bg" },
    { variable: "--accent-foreground", light: "#0A0A0A", dark: "#EDEDED", type: "text" },
    { variable: "--destructive", light: "#ef4444", dark: "#ef4444", type: "bg" },
    { variable: "--border", light: "rgb(0 0 0 / 0.06)", dark: "rgb(255 255 255 / 0.06)", type: "bg" },
    { variable: "--input", light: "rgb(0 0 0 / 0.05)", dark: "rgb(255 255 255 / 0.06)", type: "bg" },
    { variable: "--ring", light: "rgb(46 204 90 / 0.35)", dark: "rgb(46 204 90 / 0.4)", type: "bg" },
    { variable: "--sidebar", light: "rgb(255 255 255 / 0.5)", dark: "rgb(255 255 255 / 0.02)", type: "bg" },
    { variable: "--sidebar-foreground", light: "#0A0A0A", dark: "#EDEDED", type: "text" },
    { variable: "--sidebar-primary", light: "#2ECC5A", dark: "#16a34a", type: "bg" },
    { variable: "--sidebar-primary-foreground", light: "#ffffff", dark: "#0A0A0A", type: "text" },
    { variable: "--sidebar-accent", light: "rgb(0 0 0 / 0.04)", dark: "rgb(255 255 255 / 0.04)", type: "bg" },
    { variable: "--sidebar-accent-foreground", light: "#0A0A0A", dark: "#EDEDED", type: "text" },
    { variable: "--sidebar-border", light: "rgb(0 0 0 / 0.06)", dark: "rgb(255 255 255 / 0.06)", type: "bg" },
    { variable: "--sidebar-ring", light: "rgb(46 204 90 / 0.35)", dark: "rgb(46 204 90 / 0.4)", type: "bg" },
    { variable: "--chart-1", light: "#2ECC5A", dark: "#2ECC5A", type: "bg" },
    { variable: "--chart-2", light: "#22c55e", dark: "#22c55e", type: "bg" },
    { variable: "--chart-3", light: "#16a34a", dark: "#16a34a", type: "bg" },
    { variable: "--chart-4", light: "#15803d", dark: "#15803d", type: "bg" },
    { variable: "--chart-5", light: "#14532d", dark: "#14532d", type: "bg" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-10 max-w-4xl mx-auto space-y-8 sm:space-y-16">

      {/* ===== BACK TO HOME ===== */}
      <div className="flex items-start">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
          Back to home
        </Link>
      </div>

      {/* ===== HEADER ===== */}
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <h1 className="text-2xl font-semibold">Design System</h1>
        <p className="text-muted-foreground">
          Typography, Logo history & Color tokens
        </p>
        <Button variant="outline" size="lg" className="gap-2 mt-4 w-full sm:w-fit" asChild>
          <Link href="https://www.figma.com/design/soiaA74uaiLSZMI5yr5nX9/ChatMM---Quick-Draft-UI" target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            View Figma Design Draft
          </Link>
        </Button>
      </div>

      {/* ===== LOGO HISTORY ===== */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-lg font-medium border-b border-border pb-2">
          Logo History
        </h2>

        {/* Emphasize: Large logo display */}
        <div className="border border-primary rounded-lg sm:p-10 flex items-center justify-center">
          <svg width="120" height="120" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#logo-emphasize-clip)">
              <path d="M10.137 20.8302C10.029 20.9171 9.88587 20.9775 9.70772 21.0113C9.54456 21.0467 9.32304 21.0607 9.04315 21.0531C8.65829 21.0342 8.16582 20.9581 7.56574 20.8248C6.95898 20.6832 6.30035 20.4601 5.58985 20.1556C4.87935 19.851 4.16442 19.4474 3.44505 18.9446C2.73399 18.4351 2.07757 17.8064 1.4758 17.0584C0.807161 16.2274 0.366014 15.4323 0.152356 14.6732C-0.052991 13.9075 -0.0615611 13.2162 0.126646 12.5993C0.316477 11.9674 0.673185 11.4409 1.19677 11.0196C1.57907 10.7121 2.01748 10.5168 2.51202 10.4338C3.00817 10.3358 3.55982 10.4259 4.16696 10.7041C4.76741 10.974 5.42608 11.5119 6.14296 12.3179C6.50221 12.7133 6.77291 13.0158 6.95507 13.2252C7.13885 13.4196 7.2742 13.5708 7.36112 13.6788C7.44967 13.7719 7.53325 13.8758 7.61186 13.9905C7.6921 14.0902 7.81245 14.2398 7.97292 14.4393C8.1334 14.6387 8.37745 14.9421 8.70508 15.3493C8.91904 15.6153 9.10535 15.8213 9.26401 15.9675C9.41599 16.1053 9.59171 16.094 9.79117 15.9335C10.0072 15.7597 10.0559 15.5905 9.93719 15.4259C9.82009 15.2463 9.65871 15.0202 9.45306 14.7475C9.31933 14.5813 9.19563 14.4276 9.08196 14.2863C8.96161 14.1367 8.8212 13.9622 8.66072 13.7627C8.49356 13.5549 8.28376 13.2856 8.0313 12.9548C7.77215 12.6157 7.44858 12.171 7.06059 11.6207C6.43513 10.7411 6.05154 9.97508 5.9098 9.32245C5.76138 8.66152 5.784 8.10256 5.97764 7.64558C6.1646 7.18029 6.44923 6.79386 6.83153 6.48628C7.35512 6.06504 7.94169 5.8327 8.59126 5.78926C9.24244 5.73083 9.91588 5.88723 10.6116 6.25846C11.3156 6.62301 12.0019 7.22083 12.6705 8.05191C13.2723 8.79989 13.7417 9.57905 14.0788 10.3894C14.4242 11.1931 14.6695 11.9745 14.8149 12.7337C14.9603 13.493 15.0371 14.1841 15.0455 14.8071C15.0472 15.4218 15.0161 15.9191 14.9522 16.2991C14.9079 16.5674 14.8469 16.7808 14.769 16.9393C14.6979 17.1061 14.6083 17.233 14.5002 17.3199C14.2675 17.5071 14.0102 17.5361 13.7283 17.407C13.4464 17.2778 13.2318 17.0535 13.0843 16.7341C13.0407 16.6459 12.9645 16.4745 12.8555 16.2199C12.7548 15.9587 12.624 15.66 12.4632 15.324C12.304 14.9729 12.1256 14.6236 11.9281 14.2759C11.7305 13.9283 11.5214 13.6174 11.3008 13.3431C11.0133 12.9858 10.7503 12.7524 10.5117 12.6431C10.2732 12.5339 10.0916 12.5294 9.96696 12.6297C9.85892 12.7166 9.81512 12.8408 9.83556 13.0023C9.8643 13.1572 9.92223 13.3228 10.0093 13.4991C10.1048 13.6688 10.2052 13.8276 10.3105 13.9756C10.4092 14.1152 10.4853 14.2183 10.5388 14.2848C11.2809 15.2073 11.6952 15.935 11.7817 16.4678C11.8764 16.9939 11.7077 17.4309 11.2755 17.7786C10.8434 18.1262 10.3763 18.2008 9.87433 18.0023C9.38067 17.7971 8.76275 17.2332 8.02056 16.3107C7.96707 16.2443 7.88268 16.1479 7.76739 16.0216C7.64541 15.887 7.50762 15.7583 7.35402 15.6354C7.20874 15.5059 7.05939 15.4138 6.90598 15.3593C6.76088 15.298 6.63431 15.3109 6.52627 15.3978C6.40161 15.4981 6.36711 15.6764 6.4228 15.9328C6.47848 16.1892 6.65007 16.4961 6.93759 16.8535C7.15824 17.1277 7.41719 17.3985 7.71445 17.6659C8.01171 17.9333 8.3106 18.1857 8.61111 18.4231C8.91324 18.6455 9.17698 18.8372 9.40231 18.9981C9.63596 19.1524 9.79118 19.2603 9.86798 19.3217C10.1484 19.5341 10.3216 19.7919 10.3874 20.0949C10.4532 20.3979 10.3697 20.643 10.137 20.8302Z" fill="currentColor"/>
              <path d="M17.863 20.8302C17.9711 20.9171 18.1142 20.9775 18.2923 21.0113C18.4555 21.0467 18.677 21.0607 18.9569 21.0531C19.3418 21.0342 19.8342 20.9581 20.4343 20.8248C21.0411 20.6832 21.6997 20.4601 22.4102 20.1556C23.1207 19.851 23.8356 19.4474 24.555 18.9446C25.2661 18.4351 25.9225 17.8064 26.5243 17.0584C27.1929 16.2274 27.634 15.4323 27.8477 14.6732C28.053 13.9075 28.0616 13.2162 27.8734 12.5993C27.6836 11.9674 27.3269 11.4409 26.8033 11.0196C26.421 10.7121 25.9826 10.5168 25.488 10.4338C24.9919 10.3358 24.4402 10.4259 23.8331 10.7041C23.2326 10.974 22.574 11.5119 21.8571 12.3179C21.4978 12.7133 21.2271 13.0158 21.045 13.2252C20.8612 13.4196 20.7259 13.5708 20.6389 13.6788C20.5504 13.7719 20.4668 13.8758 20.3882 13.9905C20.308 14.0902 20.1876 14.2398 20.0271 14.4393C19.8667 14.6387 19.6226 14.9421 19.295 15.3493C19.081 15.6153 18.8947 15.8213 18.736 15.9675C18.5841 16.1053 18.4083 16.094 18.2089 15.9335C17.9928 15.7597 17.9441 15.5905 18.0629 15.4259C18.18 15.2463 18.3413 15.0202 18.547 14.7475C18.6807 14.5813 18.8044 14.4276 18.9181 14.2863C19.0384 14.1367 19.1789 13.9622 19.3393 13.7627C19.5065 13.5549 19.7163 13.2856 19.9688 12.9548C20.2279 12.6157 20.5515 12.171 20.9395 11.6207C21.5649 10.7411 21.9485 9.97508 22.0902 9.32245C22.2387 8.66152 22.2161 8.10256 22.0224 7.64558C21.8354 7.18029 21.5508 6.79386 21.1685 6.48628C20.6449 6.06504 20.0584 5.8327 19.4088 5.78926C18.7576 5.73083 18.0842 5.88723 17.3885 6.25846C16.6845 6.62301 15.9982 7.22083 15.3295 8.05191C14.7278 8.79989 14.2583 9.57905 13.9213 10.3894C13.5759 11.1931 13.3305 11.9745 13.1851 12.7337C13.0398 13.493 12.9629 14.1841 12.9545 14.8071C12.9528 15.4218 12.984 15.9191 13.0479 16.2991C13.0921 16.5674 13.1532 16.7808 13.231 16.9393C13.3022 17.1061 13.3918 17.233 13.4998 17.3199C13.7325 17.5071 13.9898 17.5361 14.2717 17.407C14.5536 17.2778 14.7683 17.0535 14.9158 16.7341C14.9593 16.6459 15.0356 16.4745 15.1446 16.2199C15.2453 15.9587 15.376 15.66 15.5369 15.324C15.6961 14.9729 15.8745 14.6236 16.072 14.2759C16.2695 13.9283 16.4786 13.6174 16.6993 13.3431C16.9868 12.9858 17.2498 12.7524 17.4883 12.6431C17.7268 12.5339 17.9084 12.5294 18.0331 12.6297C18.1411 12.7166 18.1849 12.8408 18.1645 13.0023C18.1357 13.1572 18.0778 13.3228 17.9907 13.4991C17.8953 13.6688 17.7949 13.8276 17.6895 13.9756C17.5909 14.1152 17.5148 14.2183 17.4613 14.2848C16.7191 15.2073 16.3048 15.935 16.2184 16.4678C16.1236 16.9939 16.2923 17.4309 16.7245 17.7786C17.1567 18.1262 17.6237 18.2008 18.1257 18.0023C18.6194 17.7971 19.2373 17.2332 19.9795 16.3107C20.033 16.2443 20.1174 16.1479 20.2327 16.0216C20.3546 15.887 20.4924 15.7583 20.646 15.6354C20.7913 15.5059 20.9407 15.4138 21.0941 15.3593C21.2392 15.298 21.3657 15.3109 21.4738 15.3978C21.5984 15.4981 21.6329 15.6764 21.5773 15.9328C21.5216 16.1892 21.35 16.4961 21.0625 16.8535C20.8418 17.1277 20.5829 17.3985 20.2856 17.6659C19.9883 17.9333 19.6895 18.1857 19.3889 18.4231C19.0868 18.6455 18.8231 18.8372 18.5977 18.9981C18.3641 19.1524 18.2089 19.2603 18.1321 19.3217C17.8516 19.5341 17.6785 19.7919 17.6127 20.0949C17.5469 20.3979 17.6303 20.643 17.863 20.8302Z" fill="currentColor"/>
            </g>
            <defs>
              <clipPath id="logo-emphasize-clip">
                <rect width="28" height="28" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>

        <div className="grid gap-2 sm:gap-6 grid-cols-2">
          {/* Single M */}
          <div className="bg-card border border-border rounded-lg p-2 sm:p-6 flex flex-col items-center justify-center text-center space-y-3">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Letter M (Matamaise font)
            </p>
            <svg width="52" height="48" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.672 23.184C7.42933 23.184 7.168 23.1093 6.888 22.96C6.62667 22.8293 6.30933 22.6053 5.936 22.288C5.432 21.84 4.844 21.196 4.172 20.356C3.5 19.4973 2.84667 18.4707 2.212 17.276C1.57733 16.0813 1.04533 14.7467 0.615999 13.272C0.205332 11.7973 -8.79169e-07 10.22 -8.79169e-07 8.53999C-8.79169e-07 6.67332 0.270666 5.10532 0.811999 3.83599C1.372 2.56666 2.11867 1.61466 3.052 0.979991C4.004 0.326658 5.068 -8.10623e-06 6.244 -8.10623e-06C7.10267 -8.10623e-06 7.91467 0.214659 8.68 0.643992C9.464 1.05466 10.1173 1.78266 10.64 2.82799C11.1627 3.85466 11.4707 5.31066 11.564 7.19599C11.62 8.12932 11.6573 8.83866 11.676 9.32399C11.7133 9.79066 11.732 10.1453 11.732 10.388C11.7507 10.612 11.7507 10.8453 11.732 11.088C11.732 11.312 11.732 11.648 11.732 12.096C11.732 12.544 11.732 13.2253 11.732 14.14C11.732 14.7373 11.76 15.2227 11.816 15.596C11.872 15.9507 12.124 16.128 12.572 16.128C13.0573 16.128 13.3093 15.9507 13.328 15.596C13.3653 15.2227 13.3933 14.7373 13.412 14.14C13.412 13.7667 13.412 13.4213 13.412 13.104C13.412 12.768 13.412 12.376 13.412 11.928C13.412 11.4613 13.4213 10.864 13.44 10.136C13.4587 9.38933 13.5053 8.42799 13.58 7.25199C13.692 5.36666 14.0093 3.90133 14.532 2.85599C15.0547 1.79199 15.6987 1.05466 16.464 0.643992C17.2293 0.214659 18.0413 -8.10623e-06 18.9 -8.10623e-06C20.076 -8.10623e-06 21.1307 0.326658 22.064 0.979991C23.016 1.61466 23.7627 2.56666 24.304 3.83599C24.864 5.10532 25.144 6.67332 25.144 8.53999C25.144 10.22 24.9293 11.7973 24.5 13.272C24.0893 14.7467 23.5667 16.0813 22.932 17.276C22.2973 18.4707 21.644 19.4973 20.972 20.356C20.3 21.196 19.712 21.84 19.208 22.288C18.8533 22.6053 18.536 22.8293 18.256 22.96C17.976 23.1093 17.7147 23.184 17.472 23.184C16.9493 23.184 16.5667 22.9413 16.324 22.456C16.0813 21.9707 16.0347 21.4293 16.184 20.832C16.2213 20.664 16.3053 20.3467 16.436 19.88C16.5853 19.4133 16.7347 18.8627 16.884 18.228C17.052 17.5747 17.192 16.9027 17.304 16.212C17.416 15.5213 17.472 14.868 17.472 14.252C17.472 13.4493 17.3693 12.8427 17.164 12.432C16.9587 12.0213 16.716 11.816 16.436 11.816C16.1933 11.816 15.9973 11.9373 15.848 12.18C15.7173 12.4227 15.6147 12.712 15.54 13.048C15.484 13.384 15.4467 13.7107 15.428 14.028C15.4093 14.3267 15.4 14.5507 15.4 14.7C15.4 16.772 15.1667 18.2187 14.7 19.04C14.252 19.8613 13.5427 20.272 12.572 20.272C11.6013 20.272 10.8827 19.8613 10.416 19.04C9.968 18.2187 9.744 16.772 9.744 14.7C9.744 14.5507 9.73467 14.3267 9.716 14.028C9.69733 13.7107 9.65067 13.384 9.576 13.048C9.52 12.712 9.41733 12.4227 9.268 12.18C9.13733 11.9373 8.95067 11.816 8.708 11.816C8.428 11.816 8.18533 12.0213 7.98 12.432C7.77467 12.8427 7.672 13.4493 7.672 14.252C7.672 14.868 7.728 15.5213 7.84 16.212C7.952 16.9027 8.08267 17.5747 8.232 18.228C8.4 18.8627 8.54933 19.4133 8.68 19.88C8.82933 20.3467 8.92267 20.664 8.96 20.832C9.10933 21.4293 9.06267 21.9707 8.82 22.456C8.57733 22.9413 8.19467 23.184 7.672 23.184Z" fill="currentColor"/>
            </svg>
          </div>

          {/* Two M's combined */}
          <div className="bg-card border border-border rounded-lg p-2 sm:p-6 flex flex-col items-center justify-center text-center space-y-3">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Two M's combined (Final logo)
            </p>
            <svg width="56" height="56" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#logo-clip)">
                <path d="M10.137 20.8302C10.029 20.9171 9.88587 20.9775 9.70772 21.0113C9.54456 21.0467 9.32304 21.0607 9.04315 21.0531C8.65829 21.0342 8.16582 20.9581 7.56574 20.8248C6.95898 20.6832 6.30035 20.4601 5.58985 20.1556C4.87935 19.851 4.16442 19.4474 3.44505 18.9446C2.73399 18.4351 2.07757 17.8064 1.4758 17.0584C0.807161 16.2274 0.366014 15.4323 0.152356 14.6732C-0.052991 13.9075 -0.0615611 13.2162 0.126646 12.5993C0.316477 11.9674 0.673185 11.4409 1.19677 11.0196C1.57907 10.7121 2.01748 10.5168 2.51202 10.4338C3.00817 10.3358 3.55982 10.4259 4.16696 10.7041C4.76741 10.974 5.42608 11.5119 6.14296 12.3179C6.50221 12.7133 6.77291 13.0158 6.95507 13.2252C7.13885 13.4196 7.2742 13.5708 7.36112 13.6788C7.44967 13.7719 7.53325 13.8758 7.61186 13.9905C7.6921 14.0902 7.81245 14.2398 7.97292 14.4393C8.1334 14.6387 8.37745 14.9421 8.70508 15.3493C8.91904 15.6153 9.10535 15.8213 9.26401 15.9675C9.41599 16.1053 9.59171 16.094 9.79117 15.9335C10.0072 15.7597 10.0559 15.5905 9.93719 15.4259C9.82009 15.2463 9.65871 15.0202 9.45306 14.7475C9.31933 14.5813 9.19563 14.4276 9.08196 14.2863C8.96161 14.1367 8.8212 13.9622 8.66072 13.7627C8.49356 13.5549 8.28376 13.2856 8.0313 12.9548C7.77215 12.6157 7.44858 12.171 7.06059 11.6207C6.43513 10.7411 6.05154 9.97508 5.9098 9.32245C5.76138 8.66152 5.784 8.10256 5.97764 7.64558C6.1646 7.18029 6.44923 6.79386 6.83153 6.48628C7.35512 6.06504 7.94169 5.8327 8.59126 5.78926C9.24244 5.73083 9.91588 5.88723 10.6116 6.25846C11.3156 6.62301 12.0019 7.22083 12.6705 8.05191C13.2723 8.79989 13.7417 9.57905 14.0788 10.3894C14.4242 11.1931 14.6695 11.9745 14.8149 12.7337C14.9603 13.493 15.0371 14.1841 15.0455 14.8071C15.0472 15.4218 15.0161 15.9191 14.9522 16.2991C14.9079 16.5674 14.8469 16.7808 14.769 16.9393C14.6979 17.1061 14.6083 17.233 14.5002 17.3199C14.2675 17.5071 14.0102 17.5361 13.7283 17.407C13.4464 17.2778 13.2318 17.0535 13.0843 16.7341C13.0407 16.6459 12.9645 16.4745 12.8555 16.2199C12.7548 15.9587 12.624 15.66 12.4632 15.324C12.304 14.9729 12.1256 14.6236 11.9281 14.2759C11.7305 13.9283 11.5214 13.6174 11.3008 13.3431C11.0133 12.9858 10.7503 12.7524 10.5117 12.6431C10.2732 12.5339 10.0916 12.5294 9.96696 12.6297C9.85892 12.7166 9.81512 12.8408 9.83556 13.0023C9.8643 13.1572 9.92223 13.3228 10.0093 13.4991C10.1048 13.6688 10.2052 13.8276 10.3105 13.9756C10.4092 14.1152 10.4853 14.2183 10.5388 14.2848C11.2809 15.2073 11.6952 15.935 11.7817 16.4678C11.8764 16.9939 11.7077 17.4309 11.2755 17.7786C10.8434 18.1262 10.3763 18.2008 9.87433 18.0023C9.38067 17.7971 8.76275 17.2332 8.02056 16.3107C7.96707 16.2443 7.88268 16.1479 7.76739 16.0216C7.64541 15.887 7.50762 15.7583 7.35402 15.6354C7.20874 15.5059 7.05939 15.4138 6.90598 15.3593C6.76088 15.298 6.63431 15.3109 6.52627 15.3978C6.40161 15.4981 6.36711 15.6764 6.4228 15.9328C6.47848 16.1892 6.65007 16.4961 6.93759 16.8535C7.15824 17.1277 7.41719 17.3985 7.71445 17.6659C8.01171 17.9333 8.3106 18.1857 8.61111 18.4231C8.91324 18.6455 9.17698 18.8372 9.40231 18.9981C9.63596 19.1524 9.79118 19.2603 9.86798 19.3217C10.1484 19.5341 10.3216 19.7919 10.3874 20.0949C10.4532 20.3979 10.3697 20.643 10.137 20.8302Z" fill="currentColor"/>
                <path d="M17.863 20.8302C17.9711 20.9171 18.1142 20.9775 18.2923 21.0113C18.4555 21.0467 18.677 21.0607 18.9569 21.0531C19.3418 21.0342 19.8342 20.9581 20.4343 20.8248C21.0411 20.6832 21.6997 20.4601 22.4102 20.1556C23.1207 19.851 23.8356 19.4474 24.555 18.9446C25.2661 18.4351 25.9225 17.8064 26.5243 17.0584C27.1929 16.2274 27.634 15.4323 27.8477 14.6732C28.053 13.9075 28.0616 13.2162 27.8734 12.5993C27.6836 11.9674 27.3269 11.4409 26.8033 11.0196C26.421 10.7121 25.9826 10.5168 25.488 10.4338C24.9919 10.3358 24.4402 10.4259 23.8331 10.7041C23.2326 10.974 22.574 11.5119 21.8571 12.3179C21.4978 12.7133 21.2271 13.0158 21.045 13.2252C20.8612 13.4196 20.7259 13.5708 20.6389 13.6788C20.5504 13.7719 20.4668 13.8758 20.3882 13.9905C20.308 14.0902 20.1876 14.2398 20.0271 14.4393C19.8667 14.6387 19.6226 14.9421 19.295 15.3493C19.081 15.6153 18.8947 15.8213 18.736 15.9675C18.5841 16.1053 18.4083 16.094 18.2089 15.9335C17.9928 15.7597 17.9441 15.5905 18.0629 15.4259C18.18 15.2463 18.3413 15.0202 18.547 14.7475C18.6807 14.5813 18.8044 14.4276 18.9181 14.2863C19.0384 14.1367 19.1789 13.9622 19.3393 13.7627C19.5065 13.5549 19.7163 13.2856 19.9688 12.9548C20.2279 12.6157 20.5515 12.171 20.9395 11.6207C21.5649 10.7411 21.9485 9.97508 22.0902 9.32245C22.2387 8.66152 22.2161 8.10256 22.0224 7.64558C21.8354 7.18029 21.5508 6.79386 21.1685 6.48628C20.6449 6.06504 20.0584 5.8327 19.4088 5.78926C18.7576 5.73083 18.0842 5.88723 17.3885 6.25846C16.6845 6.62301 15.9982 7.22083 15.3295 8.05191C14.7278 8.79989 14.2583 9.57905 13.9213 10.3894C13.5759 11.1931 13.3305 11.9745 13.1851 12.7337C13.0398 13.493 12.9629 14.1841 12.9545 14.8071C12.9528 15.4218 12.984 15.9191 13.0479 16.2991C13.0921 16.5674 13.1532 16.7808 13.231 16.9393C13.3022 17.1061 13.3918 17.233 13.4998 17.3199C13.7325 17.5071 13.9898 17.5361 14.2717 17.407C14.5536 17.2778 14.7683 17.0535 14.9158 16.7341C14.9593 16.6459 15.0356 16.4745 15.1446 16.2199C15.2453 15.9587 15.376 15.66 15.5369 15.324C15.6961 14.9729 15.8745 14.6236 16.072 14.2759C16.2695 13.9283 16.4786 13.6174 16.6993 13.3431C16.9868 12.9858 17.2498 12.7524 17.4883 12.6431C17.7268 12.5339 17.9084 12.5294 18.0331 12.6297C18.1411 12.7166 18.1849 12.8408 18.1645 13.0023C18.1357 13.1572 18.0778 13.3228 17.9907 13.4991C17.8953 13.6688 17.7949 13.8276 17.6895 13.9756C17.5909 14.1152 17.5148 14.2183 17.4613 14.2848C16.7191 15.2073 16.3048 15.935 16.2184 16.4678C16.1236 16.9939 16.2923 17.4309 16.7245 17.7786C17.1567 18.1262 17.6237 18.2008 18.1257 18.0023C18.6194 17.7971 19.2373 17.2332 19.9795 16.3107C20.033 16.2443 20.1174 16.1479 20.2327 16.0216C20.3546 15.887 20.4924 15.7583 20.646 15.6354C20.7913 15.5059 20.9407 15.4138 21.0941 15.3593C21.2392 15.298 21.3657 15.3109 21.4738 15.3978C21.5984 15.4981 21.6329 15.6764 21.5773 15.9328C21.5216 16.1892 21.35 16.4961 21.0625 16.8535C20.8418 17.1277 20.5829 17.3985 20.2856 17.6659C19.9883 17.9333 19.6895 18.1857 19.3889 18.4231C19.0868 18.6455 18.8231 18.8372 18.5977 18.9981C18.3641 19.1524 18.2089 19.2603 18.1321 19.3217C17.8516 19.5341 17.6785 19.7919 17.6127 20.0949C17.5469 20.3979 17.6303 20.643 17.863 20.8302Z" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="logo-clip">
                  <rect width="28" height="28" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        <p className="text-sm text-muted-foreground max-w-xl">
          The logo is created by combining two letter M's from the Matamaise font into a single symmetrical mark.
        </p>
      </section>

      {/* ===== TYPOGRAPHY ===== */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-lg font-medium border-b border-border pb-2">
          Typography
        </h2>

        {/* Emphasize: Geist hero */}
        <div className="border border-primary rounded-lg p-4 sm:p-10 flex flex-col items-center justify-center text-center space-y-2">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Primary Typeface
          </p>
          <p className="text-4xl sm:text-6xl font-sans font-bold tracking-tight">
            Geist
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Geist Sans &bull; Geist Mono
          </p>
        </div>

        {/* Font Families */}
        <div className="space-y-2 sm:space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Font Families
          </h3>

          <div className="grid gap-2 sm:gap-4 md:grid-cols-3">
            <div className="bg-card border border-border rounded-lg py-2 px-3 sm:p-4">
              <p className="text-xs text-muted-foreground mb-1">--font-sans</p>
              <p className="text-sm text-muted-foreground mb-1 sm:mb-2">Geist Sans (default)</p>
              <p className="text-base font-sans">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg py-2 px-3 sm:p-4">
              <p className="text-xs text-muted-foreground mb-1">--font-heading</p>
              <p className="text-sm text-muted-foreground mb-1 sm:mb-2">Geist Sans (heading)</p>
              <p className="text-base font-heading">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg py-2 px-3 sm:p-4">
              <p className="text-xs text-muted-foreground mb-1">--font-mono</p>
              <p className="text-sm text-muted-foreground mb-1 sm:mb-2">Geist Mono</p>
              <p className="text-sm sm:text-base font-mono">
                The quick brown fox jumps over the lazy dog
              </p>
            </div>
          </div>
        </div>

        {/* Type Scale */}
        <div className="space-y-2 sm:space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Type Scale
          </h3>

          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {[
              { size: "text-4xl", label: "4xl", sample: "Display Heading" },
              { size: "text-3xl", label: "3xl", sample: "Section Heading" },
              { size: "text-2xl", label: "2xl", sample: "Page Title" },
              { size: "text-xl", label: "xl", sample: "Subtitle" },
              { size: "text-lg", label: "lg", sample: "Card Title / Lead" },
              { size: "text-base", label: "base", sample: "Body text — the quick brown fox jumps over the lazy dog" },
              { size: "text-sm", label: "sm", sample: "Small / Muted text used for secondary content" },
              { size: "text-xs", label: "xs", sample: "Caption / Label" },
            ].map(({ size, label, sample }) => (
              <div key={size} className="flex items-baseline gap-4 px-4 py-3">
                <code className="text-xs text-muted-foreground w-24 shrink-0">{size}</code>
                <span className={size}>{sample}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Font Weights */}
        <div className="space-y-2 sm:space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Font Weights
          </h3>

          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {[
              { weight: "font-light", label: "Light (300)" },
              { weight: "font-normal", label: "Normal (400)" },
              { weight: "font-medium", label: "Medium (500)" },
              { weight: "font-semibold", label: "Semibold (600)" },
              { weight: "font-bold", label: "Bold (700)" },
            ].map(({ weight, label }) => (
              <div key={weight} className="flex items-baseline gap-4 px-4 py-3">
                <code className="text-xs text-muted-foreground w-28 shrink-0">{weight}</code>
                <p className={`text-sm sm:text-base ${weight}`}>
                  {label} — The quick brown fox jumps over the lazy dog
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COLORS USED ===== */}
      <section className="space-y-4 sm:space-y-6">
        <h2 className="text-lg font-medium border-b border-border pb-2">
          Colors Used
        </h2>

        {/* Emphasize: 3 main colors */}
        <div className="border border-primary rounded-lg p-2 sm:p-10">
          
          <div className="grid gap-2 sm:gap-4 grid-cols-3">
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="h-24" style={{ backgroundColor: "var(--background)" }} />
              <div className="p-3 space-y-1">
                <code className="block text-[10px] sm:text-xs font-mono text-foreground">--background</code>
                <p className="text-xs text-muted-foreground break-all">#F7F7F8</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="h-24" style={{ backgroundColor: "var(--foreground)" }} />
              <div className="p-3 space-y-1">
                <code className="block text-[10px] sm:text-xs font-mono text-foreground">--foreground</code>
                <p className="text-xs text-muted-foreground break-all">#0A0A0A</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="h-24 flex items-center justify-center" style={{ backgroundColor: "var(--primary)" }}>
                <code className="text-xs font-mono px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: "rgba(0,0,0,0.3)" }}>
                  --primary
                </code>
              </div>
              <div className="p-3 space-y-1">
                <code className="block text-[10px] sm:text-xs font-mono text-foreground">--primary</code>
                <p className="text-xs text-muted-foreground break-all">#2ECC5A</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-2 sm:gap-3 grid-cols-3 lg:grid-cols-4">
          {colors.map(({ variable, light, type }) => (
            <div
              key={variable}
              className="bg-card border border-border rounded-lg overflow-hidden"
            >
              {/* Swatch */}
              <div
                className="h-16 flex items-end p-2"
                style={{ backgroundColor: `var(${variable})` }}
              >
                {type === "text" && (
                  <span
                    className="text-xs font-mono px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: "var(--card)",
                      color: "var(--card-foreground)",
                    }}
                  >
                    {variable}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-1 sm:p-3 space-y-1">
                <code className="block text-[10px] sm:text-xs font-mono text-foreground">
                  {variable}
                </code>
                <p className="text-xs text-[10px] sm:text-muted-foreground break-all">
                  {light}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}