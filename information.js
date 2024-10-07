<script> 
        document.addEventListener("DOMContentLoaded", function () {
            const footer = document.querySelector('footer');
            footer.style.display = 'none';

            window.addEventListener("scroll", function () {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                let scrollHeight = document.documentElement.scrollHeight;
                let clientHeight = document.documentElement.clientHeight;

                if (scrollTop + clientHeight >= scrollHeight) {
                    footer.style.display = 'block';
                } else {
                    footer.style.display = 'none';
                }
            });
        });
    </script> <script>
        document.addEventListener("DOMContentLoaded", function () {
            const footer = document.querySelector('footer');
            footer.style.display = 'none';

            window.addEventListener("scroll", function () {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                let scrollHeight = document.documentElement.scrollHeight;
                let clientHeight = document.documentElement.clientHeight;

                if (scrollTop + clientHeight >= scrollHeight) {
                    footer.style.display = 'block';
                } else {
                    footer.style.display = 'none';
                }
            });
        });
    </script>