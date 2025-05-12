import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import emailjs from "@emailjs/browser";

export const HistorySender = ({ open, close, sendTo }) => {
	const [emailTo, setEmailTo] = useState("");

	const calculationsHistory = useSelector(
		(state) => state.calculations.calculation
	);

	// Checks
	if (!open) return null;

	const calculationsHistoryString = calculationsHistory
		.map((item, index) => {
			const date = new Date(item.id);
			const formattedDate = date.toLocaleString("en-US", {
				year: "numeric",
				month: "long",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				hour12: true,
			});
			return `Index:\t${index + 1}\nDate:\t${formattedDate}\nTitle:\t${
				item.note
			}\nCalculation:\t ${item.expression} = ${
				item.result
			}\n\n--------------------------------------\n`;
		})
		.join("\n");

	const [calculationsHistoryTextArea, setCalculationsHistoryTextArea] =
		useState(calculationsHistoryString);

	// console.log("\n\nHistory: ", calculationsHistory);
	// console.log("1.", calculationsHistoryString);
	// console.log("2.", calculationsHistory.length);

	const requireEmail = () => {
		return sendTo.trim() === "email" ? (
			<div className="flex items-center space-x-2">
				<label htmlFor="recipient" className="text-gray-700 dark:text-gray-200">
					Recipient:
				</label>
				<input
					type="text"
					id="recipient"
					required
					value={emailTo}
					onChange={(e) => {
						setEmailTo(e.target.value);
					}}
					className="border border-gray-300 dark:border-gray-600 rounded-lg p-2 w-full"
					placeholder={sendTo === "email" ? "Email Address" : null}
				/>
			</div>
		) : null;
	};

	const handleShare = async () => {
		if (sendTo === "email") {
			const recipient = document.getElementById("recipient");
			if (!recipient.value) {
				toast.error("Please enter a recipient email address.", {
					duration: 3000,
					style: {
						background: "#333",
						color: "#fff",
					},
				});
				recipient.focus();
				return;
			}

			// Basic email validation
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(emailTo)) {
				toast.error("Please enter a valid email address.", {
					duration: 3000,
					style: {
						background: "#333",
						color: "#fff",
					},
				});
				recipient.style.borderColor = "red";
				recipient.style.boxShadow = "0 0 5px red";
				recipient.focus();
				return;
			}
			// Notify the user
			// toast.error("Sorry - This feature is currently in development phase!", {
			// 	duration: 3000,
			// 	style: {
			// 		background: "#333",
			// 		color: "#fff",
			// 		textAlign: "center",
			// 	},
			// });

			const emailResult = await emailjs.send(
				import.meta.env.VITE_EMAILJS_SERVICE_ID,
				import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
				{
					to_email: emailTo,
					subject: "Mailculator Calculation History",
					historyBody: calculationsHistoryTextArea,
				},
				import.meta.env.VITE_EMAILJS_PUBLIC_KEY
			);

			if (emailResult.status === 200) {
				toast.success("Email sent successfully!", {
					duration: 3000,
					style: {
						background: "#333",
						color: "#fff",
					},
				});
			} else {
				console.error("Failed to send email:", emailResult);
				toast.error("Failed to send email. Please try again later.", {
					duration: 3000,
					style: {
						background: "#333",
						color: "#fff",
					},
				});
			}
		} else if (sendTo === "whatsapp") {
			const message = `\t\t*MailCulator*\n_| Send your calculation on e-mail or whatsapp |_\n*-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-*\n\n${calculationsHistoryTextArea}\nSent from Mailculator.vercel.app _by_ asherfraz.com`;
			const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(
				message
			)}`;
			window.open(url, "_blank");
		}
		close();
	};

	return (
		<>
			<div className="fixed inset-0 bg-black/50 z-30  flex items-center justify-center  backdrop-blur-sm">
				<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-2xl m-4">
					<h2 className="text-xl font-semibold border-b-2 dark:border-blue-200 mb-4">
						Send As{" "}
						{sendTo === "email"
							? "Email"
							: sendTo === "whatsapp"
							? "WhatsApp"
							: null}
					</h2>
					<p className="text-gray-700 dark:text-gray-200 mb-4">
						You can now share your calculations with others via {sendTo}.
					</p>
					<div className="flex flex-col space-y-4">
						{requireEmail()}
						<div className="flex flex-col items-start justify-center space-y-2">
							<label
								htmlFor="message"
								className="text-gray-700 dark:text-gray-200"
							>
								Message:
							</label>
							<textarea
								id="message"
								className={`border border-gray-300 dark:border-gray-600 rounded-lg p-2 w-full h-32 md:h-48
									lg:h-64 `}
								placeholder={`Your calculation history...`}
								value={calculationsHistoryTextArea}
								onChange={(e) => {
									setCalculationsHistoryTextArea(e.target.value);
								}}
							></textarea>
						</div>
					</div>
					<div className="mt-4 flex items-end justify-end space-x-4">
						<button
							className="px-4 py-2 bg-green-600 hover:bg-green-800 text-white rounded-lg flex items-center"
							onClick={() => {
								handleShare();
							}}
						>
							Send
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="ml-1 size-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
								/>
							</svg>
						</button>
						<button
							className="px-4 py-2 bg-red-600 hover:bg-red-800 text-white rounded-lg"
							onClick={close}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
