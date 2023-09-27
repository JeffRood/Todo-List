FROM python:3.10.4-alpine3.15
WORKDIR /root
ADD / /root
RUN pip install -r requirements.txt
RUN mkdir -p /var/log/microservices
ENV PYTHONPATH=/root
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "6051"]
