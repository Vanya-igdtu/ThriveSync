import joblib

persona_model = joblib.load("../models/persona_model.pkl")
persona_scaler = joblib.load("../models/persona_scaler.pkl")
persona_names = joblib.load("../models/persona_names.pkl")

print("Model Type:", type(persona_model))
print("Scaler Type:", type(persona_scaler))

print("\nPersona Names:")
print(persona_names)

print("\nClusters:")
print(persona_model.n_clusters)

print("\nCluster Centers Shape:")
print(persona_model.cluster_centers_.shape)