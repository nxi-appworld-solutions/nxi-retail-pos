/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Player from "lottie-react";

export default function Maintenance() {
    return (
        <div className="page-wrapper">
            <div className="content p-0">
                <main className="maintenance-page" role="main" aria-labelledby="maintenance-title">
                    <div className="maintenance__bg"></div>

                    <section className="maintenance__card" aria-live="polite">
                        <div className="maintenance__animation" aria-hidden="true">
                            <Player
                                autoplay
                                loop
                                path="/assets/animations/maintenance.json"
                                // src="assets/animations/maintenance.json"
                                style={{ height: "100%", width: "100%" }}
                                keepLastFrame={false}
                            />
                        </div>

                        <div className="maintenance__content">
                            <h1 id="maintenance-title" className="maintenance__title">We’ll be back soon</h1>
                            <p className="maintenance__subtitle">
                                Our site is currently under maintenance. We're making improvements and will be back shortly.
                            </p>

                            <div className="maintenance__meta">
                                <p className="eta"><strong>Estimated time:</strong> 30–60 minutes</p>

                                <form
                                    className="notify-form"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const email = new FormData(e.currentTarget).get("email");
                                        // Hook this to your API / service. For demo we'll just alert.
                                        if (email) {
                                            alert(`Thanks — we'll notify ${email}`);
                                        } else {
                                            alert("Please enter an email to be notified.");
                                        }
                                    }}
                                >
                                    <label htmlFor="email" className="visually-hidden">Email to notify</label>
                                    <input
                                        id="email"
                                        name="email"
                                        className="notify-form__input"
                                        type="email"
                                        placeholder="your@email.com"
                                        aria-label="Email to notify when site is back"
                                    />
                                    <button className="notify-form__btn" type="submit">Notify me</button>
                                </form>

                                <a className="support-link" href="mailto:support@example.com">Contact support</a>
                            </div>
                        </div>
                    </section>

                    <footer className="maintenance__footer">
                        © {new Date().getFullYear()} Xcel Technologies — Thank you for patience
                    </footer>
                </main>
            </div>
        </div>
    );
}
