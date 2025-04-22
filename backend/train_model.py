### Train & Save Model (backend/train_model.py)

from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
import joblib

iris = load_iris()
X, y = iris.data, iris.target

clf = RandomForestClassifier()
clf.fit(X, y)

joblib.dump(clf, "model.pkl")