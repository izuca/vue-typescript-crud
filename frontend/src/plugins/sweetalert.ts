import swal from "sweetalert2"

const toastMixin = swal.mixin({
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: toast => {
		toast.addEventListener("mouseenter", swal.stopTimer)
		toast.addEventListener("mouseleave", swal.resumeTimer)
	},
})

export const toast = {
	error: (title?: string, text?: string) =>
		toastMixin.fire(title, text, "error"),
	success: (title?: string, text?: string) =>
		toastMixin.fire(title, text, "success"),
}

export const alert = {
	question: (title?: string, text?: string) =>
		swal.fire({
			title,
			text,
			icon: "question",
			showCancelButton: true,
			showConfirmButton: true,
			customClass: {
				confirmButton: "!bg-slate-900",
				cancelButton:
					"!bg-transparent !text-slate-900 !border !border-slate-900 !border-solid",
			},
		}),
	error: (title?: string, text?: string) =>
		swal.fire({
			title,
			text,
			icon: "error",
			showConfirmButton: true,
			customClass: {
				confirmButton: "!bg-slate-900",
			},
		}),
}
